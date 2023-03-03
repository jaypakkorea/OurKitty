package com.nyang.cat.dev.pictures.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.nyang.cat.dev.dishes.repository.DishRepository;
import com.nyang.cat.dev.pictures.dto.PictureDto;
import com.nyang.cat.dev.pictures.dto.PictureFormDto;
import com.nyang.cat.dev.pictures.repository.PictureIoTCatImgLikeRepository;
import com.nyang.cat.dev.pictures.repository.PictureIoTCatImgRepository;
import com.nyang.cat.dev.pictures.service.common.PicturesMethod;
import com.nyang.cat.dev.users.dto.UserDto;
import com.nyang.cat.dev.users.service.UserAuthService;
import com.nyang.cat.dev.users.service.common.UserMethod;
import com.nyang.cat.dev.util.S3Uploader;
import com.nyang.cat.domain.Dish;
import com.nyang.cat.domain.IoTCatImg;
import com.nyang.cat.domain.IoTCatImgLike;
import com.nyang.cat.domain.User;
import com.nyang.cat.exception.common.CustomException;
import com.nyang.cat.exception.common.ObjectCrudException;
import com.nyang.cat.exception.constants.ErrorCode;
import com.nyang.cat.exception.iot.ImageUploadFailureException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class PictureServiceImpl implements PictureService {

	private final PictureIoTCatImgRepository pictureIoTCatImgRepository;
	private final PictureIoTCatImgLikeRepository pictureIoTCatImgLikeRepository;
	private final DishRepository dishRepository;
	private final S3Uploader s3Uploader;

	private final UserMethod userMethod;
	private final PicturesMethod picturesMethod;
	private final UserAuthService userAuthService;

	/**
	 * 시리얼 번호로 DB 에서 냥그릇 정보를 가져온 뒤, S3 서버에 사진을 업로드 하고 DB 에 사진 정보 저장
	 * @param serialNumber
	 * @param imageFile
	 * @param ext
	 * @throws Exception
	 */
	@Override
	public void uploadFileAndSave(String serialNumber, MultipartFile imageFile, String ext) throws Exception {
		// 1. Dish 정보 가져오기
		Optional<Dish> dishDto = dishRepository.findBySerialNumber(serialNumber);
		if (dishDto.isEmpty()) {
			throw new ObjectCrudException(ErrorCode.NOT_RETRIEVE_ERROR, Dish.class);
		}
		Dish dish = dishDto.get();

		// 2. S3 서버에 사진 업로드
		String imgUrl = s3Uploader.upload(imageFile, ext);
		if (imgUrl == null) {
			throw new ImageUploadFailureException(ErrorCode.IMAGE_UPLOAD_FAIL);
		}
		log.debug("URL: {}", imgUrl);

		// 3. DB에 URL 저장
		PictureDto pictureDto = PictureDto.builder().dish(dish).imgUrl(imgUrl).build();

		IoTCatImg ioTCatImg = pictureDto.toEntity();
		pictureIoTCatImgRepository.save(ioTCatImg);
	}

	/**
	 * 해당 냥그릇에 사진 URL 을 추가
	 * @param pictureFormDto
	 * @return
	 * @throws Exception
	 */
	@Override
	public PictureFormDto addPicture(PictureFormDto pictureFormDto) {
		// 1. Dish 가져오기
		Optional<Dish> optionalDish = dishRepository.findById(pictureFormDto.getDishId());
		if (optionalDish.isEmpty()) {
			throw new ObjectCrudException(ErrorCode.NOT_RETRIEVE_ERROR, Dish.class);
		}

		// 2. 사진 추가하기
		PictureDto pictureDto = PictureDto.builder()
			.dish(optionalDish.get())
			.imgUrl(pictureFormDto.getImgUrl())
			.build();
		IoTCatImg ioTCatImg = pictureIoTCatImgRepository.save(pictureDto.toEntity());

		return new PictureFormDto(ioTCatImg);
	}

	/**
	 * 사진 아이디를 통해 사진 정보 가져오기
	 * @param pictureId
	 * @return
	 * @throws Exception
	 */
	@Override
	public PictureDto findPicture(Long pictureId, String token) {
		Optional<IoTCatImg> optionalIoTCatImg = pictureIoTCatImgRepository.findById(pictureId);
		if (optionalIoTCatImg.isEmpty()) {
			throw new ObjectCrudException(ErrorCode.NOT_FOUND_ENTITY, IoTCatImg.class);
		}

		IoTCatImg ioTCatImg = optionalIoTCatImg.get();
		Boolean isLike = isLike(token, ioTCatImg);

		return new PictureDto(ioTCatImg, isLike);
	}

	/**
	 * 냥그릇 아이디를 통해 냥그릇에 연결된 모든 IoT 사진들 가져오기
	 * @param dishId
	 * @return
	 * @throws Exception
	 */
	@Override
	public Slice<PictureDto> findPictures(Pageable pageable, Long dishId, String token) {
		Dish dish = Dish.builder().id(dishId).build();

		return pictureIoTCatImgRepository.findIoTCatImgsByDishOrderByCreatedDateDesc(pageable, dish)
			.map(ioTCatImg -> new PictureDto(ioTCatImg, isLike(token, ioTCatImg)));
	}

	/**
	 * 사진 정보 수정하기
	 * @param pictureDto
	 * @return
	 * @throws Exception
	 */
	@Override
	public PictureFormDto modifyPicture(PictureDto pictureDto) {
		// 해당 사진 조회
		Optional<IoTCatImg> optionalIoTCatImg = pictureIoTCatImgRepository.findById(pictureDto.getId());
		if (optionalIoTCatImg.isEmpty()) {
			throw new ObjectCrudException(ErrorCode.NOT_FOUND_ENTITY, IoTCatImg.class);
		}
		// 업데이트
		IoTCatImg ioTCatImg = optionalIoTCatImg.get();
		ioTCatImg.update(pictureDto.getImgUrl(), pictureDto.getDish());

		IoTCatImg updated = pictureIoTCatImgRepository.save(ioTCatImg);
		return new PictureFormDto(updated);
	}

	/**
	 * 사진 삭제하기
	 * @param pictureId
	 * @throws Exception
	 */
	@Override
	public void deletePicture(Long pictureId) throws Exception {
		// 1. DB에서 삭제하기
		Optional<IoTCatImg> optionalIoTCatImg = pictureIoTCatImgRepository.findById(pictureId);
		if (optionalIoTCatImg.isEmpty()) {
			throw new ObjectCrudException(ErrorCode.NOT_RETRIEVE_ERROR, IoTCatImg.class);
		}

		IoTCatImg ioTCatImg = optionalIoTCatImg.get();
		String imgUrl = ioTCatImg.getImgUrl();

		pictureIoTCatImgLikeRepository.deleteByIoTCatImg(ioTCatImg);
		pictureIoTCatImgRepository.delete(ioTCatImg);

		// 2. DB에서 삭제 됐다면 파일 서버에서 삭제하기
		optionalIoTCatImg = pictureIoTCatImgRepository.findById(ioTCatImg.getId());
		if (!optionalIoTCatImg.isEmpty()) {
			throw new ObjectCrudException(ErrorCode.NOT_DELETED_ERROR, IoTCatImg.class);
		}

		s3Uploader.deleteFile(imgUrl);
		log.debug("기존 imgurl: {}", imgUrl);
	}

	@Override
	public List<PictureDto> findRecentPictures(String token) {
		List<IoTCatImg> findList = pictureIoTCatImgRepository.findTop20ByOrderByIdDesc();
		List<PictureDto> list = new ArrayList<>();
		for (IoTCatImg ioTCatImg : findList) {
			if (ioTCatImg.getDish().getDishState() == 2) {
				continue;
			}
			Boolean isLike = isLike(token, ioTCatImg);
			list.add(new PictureDto(ioTCatImg, isLike));
		}
		return list;
	}

	@Override
	public void likePicture(Long pictureId, String token) {

		// 유저조회
		User user = userMethod.getTokenUser(token, true);

		// 사진조회
		IoTCatImg ioTCatImg = pictureIoTCatImgRepository.findById(pictureId)
			.orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_ENTITY));

		Optional<IoTCatImgLike> ioTCatImgLikeOptional = pictureIoTCatImgLikeRepository.findByIoTCatImgAndUser(ioTCatImg,
			user);

		// 아직 좋아요 누른 적이 없음
		if (ioTCatImgLikeOptional.isEmpty()) {
			IoTCatImgLike ioTCatImgLike = IoTCatImgLike.builder().user(user).ioTCatImg(ioTCatImg).build();
			pictureIoTCatImgLikeRepository.save(ioTCatImgLike);
		}
		// 한 번 이상 좋아요를 눌렀음
		else {
			IoTCatImgLike ioTCatImgLike = ioTCatImgLikeOptional.get();

			if (ioTCatImgLike.getState() == 0) {
				ioTCatImgLike.setStateOff();
			} else if (ioTCatImgLike.getState() == 1) {
				ioTCatImgLike.setStateOn();
			}
		}
	}

	@Override
	public List<PictureDto> findHungryCatPictures(String token) {

		List<IoTCatImg> top50Pictures = pictureIoTCatImgRepository.findTop50ByIsHungryOrderByCreatedDateDesc(true);

		List<PictureDto> pictures = top50Pictures.stream()
			.map(ioTCatImg -> new PictureDto(ioTCatImg, isLike(token, ioTCatImg)))
			.collect(Collectors.toList());

		Collections.shuffle(pictures);

		return pictures.stream().limit(10).collect(Collectors.toUnmodifiableList());
	}

	@Override
	public List<PictureDto> findRecentLikeDishImages(String token) {
		UserDto userDto = userAuthService.findUser(token, false);

		if (userDto == null) {
			return new ArrayList<>();
		}

		List<IoTCatImg> imgList = pictureIoTCatImgRepository.findLikeDishImgs(userDto.getId());

		if (imgList.size() > 20) {
			imgList = imgList.subList(0, 20);
		}

		List<PictureDto> pictureDtoList = imgList
			.stream()
			.filter(ioTCatImg -> ioTCatImg.getDish().getDishState() != 2)
			.map(ioTCatImg -> new PictureDto(ioTCatImg, isLike(token, ioTCatImg)))
			.collect(Collectors.toUnmodifiableList());

		return pictureDtoList;
	}

	/**
	 * [관리자용] 최신 IoT 사진 가져오기
	 * @return
	 */
	@Override
	public List<PictureDto> findRecentPicturesByAdmin() {
		List<IoTCatImg> findList = pictureIoTCatImgRepository.findTop20ByOrderByIdDesc();
		List<PictureDto> list = new ArrayList<>();
		for (IoTCatImg ioTCatImg : findList) {
			list.add(new PictureDto(ioTCatImg, false));
		}
		return list;
	}

	private Boolean isLike(String token, IoTCatImg ioTCatImg) {
		User user = userMethod.getTokenUser(token, false);
		if (user == null) {
			return false;
		} else {
			return picturesMethod.isPictureLike(user, ioTCatImg);
		}
	}
}
