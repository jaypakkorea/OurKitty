package com.nyang.cat.dev.dishes.service;

import java.io.IOException;
import java.util.Objects;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.nyang.cat.dev.admins.dto.AdminDto;
import com.nyang.cat.dev.admins.repository.AdminGroupRepository;
import com.nyang.cat.dev.admins.service.AdminAuthService;
import com.nyang.cat.dev.dishes.dto.DishAddDto;
import com.nyang.cat.dev.dishes.dto.DishDto;
import com.nyang.cat.dev.dishes.dto.LocationDto;
import com.nyang.cat.dev.dishes.repository.DishGpsLogRepository;
import com.nyang.cat.dev.dishes.repository.DishRepository;
import com.nyang.cat.dev.util.S3Uploader;
import com.nyang.cat.dev.util.UnregisteredLocations;
import com.nyang.cat.dev.util.converter.DishConverter;
import com.nyang.cat.domain.AdminGroup;
import com.nyang.cat.domain.Dish;
import com.nyang.cat.domain.DishGpsLog;
import com.nyang.cat.exception.common.CustomException;
import com.nyang.cat.exception.constants.ErrorCode;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class DishAddModDelServiceImpl implements DishAddModDelService {

	private final AdminAuthService adminAuthService;
	private final DishRepository dishRepository;
	private final AdminGroupRepository adminGroupRepository;
	private final DishGpsLogRepository dishGpsLogRepository;
	private final S3Uploader s3Uploader;

	/**
	 * 냥그릇 추가 메서드
	 * @param dishDto            냥그릇 추가 시 받아오는 데이터들을 가진 DTO
	 * @param token            관리자 인증 및 냥그릇 관리자 소속을 저장하기 위한 관리자의 엑세스 토큰
	 * @return 생성된 냥그릇의 ID 값
	 * @throws IOException        s3 파일서버 업로드 실패
	 */
	@Transactional
	@Override
	public DishDto addDish(DishAddDto dishDto, String token) {

		// 토큰을 인증서버로 부터 검증받고 관리자 dto 를 받아온다.
		AdminDto adminDto = adminAuthService.findAdmin(token);

		// 이미 존재하는 시리얼 번호의 냥그릇이 있다면 에러
		if (dishRepository.existsBySerialNumber(dishDto.getSerialNumber())) {
			throw new CustomException(ErrorCode.ALREADY_SAVED_DTO);
		}

		// 냥그릇에 저장하기 위한 해당 관리자의 소속을 불러온다. 없다면 에러
		Optional<AdminGroup> adminGroupOptional = adminGroupRepository.findById(adminDto.getGroupId());
		if (adminGroupOptional.isEmpty()) {
			throw new CustomException(ErrorCode.NOT_FOUND_ENTITY);
		}

		// Dish Entity 생성
		Dish dish = Dish.builder()
			.serialNumber(dishDto.getSerialNumber())
			.adminGroup(adminGroupOptional.get())
			.dishName(dishDto.getDishName())
			.otherNote(dishDto.getOtherNote())
			.build();

		return DishConverter.dishConvertToDishInfoDto(dishRepository.save(dish));
	}

	/**
	 * 냥그릇 수정 메서드
	 *
	 * @param dishDto 수정할 정보가 담긴 DTO
	 * @param token   권한 인증을 위한 토큰
	 * @return 수정한 냥그릇의 ID 값
	 */
	@Transactional
	@Override
	public DishDto modifyDish(DishAddDto dishDto, String token, MultipartFile image) throws IOException {

		// 냥그릇 존재유무, 사용자 권한 체크
		Dish dish = check(token, dishRepository.findById(dishDto.getDishId()));

		// 냥그릇 이름이 있는 지 확인
		if (dishDto.getDishName().isBlank()) {
			throw new CustomException(ErrorCode.NO_DISH_NAME);
		}

		// 비고 내용이 없다면 공백처리
		if (dishDto.getOtherNote() == null) {
			dishDto.setOtherNote("");
		}

		// 이름, 비고 수정
		dish.update(dishDto.getDishName(), dishDto.getOtherNote());

		// 위치 수정 ( 위치 정보가 없다면 상태를 0으로 돌리고 위치, 주소 정보 초기화 )
		if (dishDto.getLat() == null || dishDto.getLon() == null || dishDto.getLoadAddress() == null) {
			dish.originalLocationDelete();
		} else {
			dish.originalLocationModify(dishDto.getLat(), dishDto.getLon(), dishDto.getLoadAddress());
		}

		// 이미지 경로가 다르면 새로운 이미지를 저장
		if (dish.getDishImg() == null || !dish.getDishImg().equals(dishDto.getImageUrl())) {

			// 기존의 파일 삭제
			if(dish.getDishImg() != null) {
				s3Uploader.deleteFile(dish.getDishImg());
			}

			// 새로운 파일의 경로
			String newUrl = null;

			// 새로운 이미지가 있다면 저장
			if (image != null && !image.isEmpty()) {
				newUrl = s3Uploader.upload(image);
			}

			// 세로운 파일경로를 저장
			dish.imgModify(newUrl);
		}

		// 수정한 정보를 저장
		dishRepository.save(dish);

		return DishConverter.dishConvertToDishInfoDto(dish);
	}

	/**
	 * 냥그릇 삭제 메서드
	 * @param id        삭제하려는 냥그릇의 ID 값
	 * @param token        권한 인증을 위한 토큰
	 * @return 삭제한 냥그릇의 ID 값
	 */
	@Transactional
	@Override
	public Long deleteDish(Long id, String token) {

		// 냥그릇 존재유무, 사용자 권한 체크
		Dish dish = check(token, dishRepository.findById(id));

		// 예외 : 이미 삭제된 냥그릇입니다.
		if (dish.getDishState() == 2) {
			throw new CustomException(ErrorCode.ALREADY_SAVED_DTO);
		}

		dish.delete(); //상태 변경
		dishRepository.save(dish);

		return dish.getId();
	}

	/**
	 * 특정 냥그릇의 위치정보를 받아오는 메서드
	 * @param id        위치정보를 받으려는 냥그릇의 ID 값
	 * @param token        권한 인증을 위한 토큰
	 * @return 해당 냥그릇의 위치정보 DTO
	 */
	@Transactional
	@Override
	public LocationDto findDishLocation(Long id, String token) {

		// 냥그릇 존재유무, 사용자 권한 체크
		Dish dish = check(token, dishRepository.findById(id));

		Optional<DishGpsLog> gpsLogOptional = dishGpsLogRepository.findTop1ByDishOrderByCreatedDate(dish);

		LocationDto locationDto;
		if (gpsLogOptional.isPresent()) {
			// DB에 저장된 내용이 있는 경우 값을 불러와서 Location Dto 설정
			DishGpsLog dishGpsLog = gpsLogOptional.get();
			locationDto = LocationDto.builder().lat(dishGpsLog.getAfterLat()).lon(dishGpsLog.getAfterLon()).build();

			// UnregisteredLocations 에 저장되어 있는 값 삭제
			UnregisteredLocations.deleteLocation(dish.getSerialNumber());
		} else {
			// DB에 저장된 내용이 없는 경우 UnregisteredLocations 에 저장되어 있는 최근 위치 정보 불러옴
			locationDto = UnregisteredLocations.getLocation(dish.getSerialNumber());

			// 서버에 저장된 값이 없는경우 throw ( 냥그릇 기기의 위치정보 데이터가 없습니다 )
			if (locationDto == null) {
				throw new CustomException(ErrorCode.NOT_FOUND_LOCATION_INFO);
			}
		}

		return locationDto;
	}

	/**
	 * 특정 냥그릇의 original 위치 정보를 저장하는 메서드
	 * @param locationDto    저장할 정보를 담은 DTO
	 * @param token            권한 인증을 위한 토큰
	 */
	@Transactional
	@Override
	public DishDto addDishLocation(LocationDto locationDto, String token) throws IOException {

		// 냥그릇 존재유무, 사용자 권한 체크
		Dish dish = check(token, dishRepository.findById(locationDto.getDishId()));

		if (locationDto.getImage() == null) {
			// 사진 정보가 없는 경우 에러
			log.error("위치 정보 등록 중 사진 파일 없음 에러");
			throw new CustomException(ErrorCode.REQUEST_PARAMETER);
		}

		if (locationDto.getLon() == null || locationDto.getLat() == null
			|| locationDto.getLoadAddress() == null) {
			log.error("위치 정보 등록 중 위치 정보 없음 에러");
			throw new CustomException(ErrorCode.REQUEST_PARAMETER);
		}
		// s3 서버에 이미지 업로드
		String imgUrl = s3Uploader.upload(locationDto.getImage());

		// 냥그릇의 사진 경로 정보 수정
		dish.imgModify(imgUrl);

		// 냥그릇의 original 위치 정보 수정
		dish.originalLocationModify(locationDto.getLat(), locationDto.getLon(), locationDto.getLoadAddress());

		dishRepository.save(dish);

		return DishConverter.dishConvertToDishInfoDto(dish);
	}

	/**
	 * 사용자 권한 체크 및 냥그릇 존재 유무 체크하는 메서드
	 * @param token            권한 인증을 위한 토큰
	 * @param dishOptional    냥그릇 존재 여부를 확인하기 위한 Optional 변수
	 * @return 권한 확인이 되고 존재가 확인된 냥그릇
	 */
	private Dish check(String token, Optional<Dish> dishOptional) {

		// 냥그릇 존재 여부 체크
		if (dishOptional.isEmpty()) {
			throw new CustomException(ErrorCode.NOT_FOUND_ENTITY);
		}

		Dish dish = dishOptional.get();

		// 관리자 권한 여부 체크
		AdminDto adminDto = adminAuthService.findAdmin(token);

		if (!Objects.equals(adminDto.getGroupId(), dish.getAdminGroup().getId())) {
			throw new CustomException(ErrorCode.NO_AUTHORITY);
		}

		return dish;
	}
}
