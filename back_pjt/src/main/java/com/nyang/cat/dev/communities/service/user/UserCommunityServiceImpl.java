package com.nyang.cat.dev.communities.service.user;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import com.nyang.cat.dev.communities.repository.*;
import com.nyang.cat.dev.communities.service.common.CommunityMethod;
import com.nyang.cat.dev.dishes.service.common.DishMethod;
import com.nyang.cat.dev.users.service.common.UserMethod;
import com.nyang.cat.domain.*;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.nyang.cat.dev.communities.dto.user.UserCommunityRequestDto;
import com.nyang.cat.dev.communities.dto.user.UserCommunityDetailDto;
import com.nyang.cat.dev.dishes.repository.DishRepository;
import com.nyang.cat.dev.util.S3Uploader;
import com.nyang.cat.exception.common.CustomException;
import com.nyang.cat.exception.constants.ErrorCode;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class UserCommunityServiceImpl implements UserCommunityService {

	private final CommunityRepository communityRepository;
	private final CommunityCategoryRepository communityCategoryRepository;
	private final CommunityImgRepository communityImgRepository;

	private final CommunityReportRepository communityReportRepository;
	private final CommunityLikeRepository communityLikeRepository;
	private final CommunityScrapRepository communityScrapRepository;

	private final CommunityCommentRepository communityCommentRepository;
	private final CommunityCommentLikeRepository communityCommentLikeRepository;

	private final DishRepository dishRepository;
	private final S3Uploader s3Uploader;

	private final CommunityMethod communityMethod;
	private final UserMethod userMethod;
	private final DishMethod dishMethod;

	/**
	 * 커뮤니티 추가
	 *
	 * @param userCommunityRequestDto 게시글 추가정보
	 * @param token               사용자 토큰
	 * @throws IOException 파일업로드 예외
	 */
	@Override
	public void userCommunityUserAdd(UserCommunityRequestDto userCommunityRequestDto, String token) throws IOException {
		log.debug("communityAdd Start");
		Long communityCategoryId = userCommunityRequestDto.getCommunityCategoryId();

		CommunityCategory category = communityMethod.getCommunityCategory(communityCategoryId);
		log.info("communityAdd 카테고리 조회 성공");

		// 냥그릇 조회
		Dish dish = dishRepository.findById(userCommunityRequestDto.getDishId()).orElse(null);
		log.info("communityAdd 냥그릇 조회 성공");

		// 유저 조회
		User user = communityMethod.getUser(token, true);
		log.info("communityAdd 유저 조회 성공");

		// 커뮤니티 추가
		Community community = Community.builder()
			.communityCategory(category)
			.dish(dish)
			.user(user)
			.content(userCommunityRequestDto.getContent())
			.build();
		communityRepository.save(community);

		log.info("listSize : {}", userCommunityRequestDto.getImgFiles());

		// 이미지 업로드
		for (MultipartFile file : userCommunityRequestDto.getImgFiles()) {
			String imgUrl = s3Uploader.upload(file);
			CommunityImg img = CommunityImg.builder().community(community).imgUrl(imgUrl).build();
			communityImgRepository.save(img);
		}

		log.debug("communityAdd End");
	}

	/**
	 * 커뮤니티 수정
	 *
	 * @param id                  게시글 ID
	 * @param userCommunityRequestDto 게시글 수정정보
	 * @param token               사용자 토큰
	 * @throws IOException 파일업로드 예외
	 */
	@Override
	public void userCommunityUserModify(Long id, UserCommunityRequestDto userCommunityRequestDto, String token) throws
		IOException {
		log.debug("communityModify Start ");

		// 커뮤니티 조회
		Community findCommunity = communityMethod.getCommunity(id);
		log.debug("커뮤니티 조회");

		// 유저 조회
		User user = communityMethod.getUser(token, true);
		log.debug("커뮤니티 조회");

		// 사용자가 게시글을 작성한 유저인지 확인
		if (user != null && user.getId().equals(findCommunity.getUser().getId())) {
			// 카테고리 조회
			CommunityCategory category = communityCategoryRepository.findById(
					userCommunityRequestDto.getCommunityCategoryId())
				.orElseThrow(() -> {
					log.error("카테고리 조회 실패");
					throw new CustomException(ErrorCode.NOT_FOUND_ENTITY);
				});
			log.info("communityAdd 카테고리 조회 성공");

			// 냥그릇 조회
			Dish dish = dishRepository.findById(userCommunityRequestDto.getDishId()).orElse(null);
			log.info("communityAdd 냥그릇 조회 성공");

			// 커뮤니티 수정
			findCommunity.setCommunityModify(dish, category,
				userCommunityRequestDto.getContent());
			log.debug("커뮤니티 수정");

			// 게시글 이미지 수정(기존 이미지 경로 삭제 -> 새로운 이미지 추가)
			List<CommunityImg> deleteImgs = communityImgRepository.findByCommunity(findCommunity);
			communityMethod.deleteImages(deleteImgs);
			communityImgRepository.deleteByCommunity(findCommunity);
			log.debug("커뮤니티 이미지 지움");

			for (MultipartFile file : userCommunityRequestDto.getImgFiles()) {
				String imgUrl = s3Uploader.upload(file);
				CommunityImg img = CommunityImg.builder().community(findCommunity).imgUrl(imgUrl).build();
				communityImgRepository.save(img);
			}
			log.debug("커뮤니티 이미지 생성");

		} else {
			throw new CustomException(ErrorCode.NO_AUTHORITY);
		}

		log.debug("communityModify End");
	}

	/**
	 * 커뮤니티 삭제
	 * @param id    게시글 ID
	 * @param token 사용자 토큰
	 * @throws IOException 파일업로드 예외
	 */
	@Override
	public void userCommunityDelete(Long id, String token) throws IOException {
		log.debug("communityDelete Start ");

		// 유저 조회
		User user = communityMethod.getUser(token, true);

		// 커뮤니티 조회
		Community findCommunity = communityMethod.getCommunity(id);

		// 사용자가 게시글을 작성한 유저인지 확인
		if (user.equals(findCommunity.getUser())) {

			// 커뮤니티 삭제
			findCommunity.setCommunityStateOff();

			// 이미지 삭제
			List<CommunityImg> deleteImgs = communityImgRepository.findByCommunity(findCommunity);
			communityMethod.deleteImages(deleteImgs);
			communityImgRepository.deleteByCommunity(findCommunity);

			// 커뮤니티 좋아요 삭제
			List<CommunityLike> likeList = communityLikeRepository.findByCommunity(findCommunity);
			for (CommunityLike communityLike : likeList) {
				communityLike.setCommunityLikeStateOff();
			}

			// 커뮤니티 신고 삭제
			List<CommunityReport> reportList = communityReportRepository.findByCommunity(findCommunity);
			for (CommunityReport communityReport : reportList) {
				communityReport.setCommunityReportStateOff();
			}

			// 커뮤니티 스크랩 삭제
			List<CommunityScrap> scrapList = communityScrapRepository.findByCommunity(findCommunity);
			for (CommunityScrap communityScrap : scrapList) {
				communityScrap.setCommunityReportStateOff();
			}

			// 커뮤니티 댓글, 댓글 좋아요 삭제
			List<CommunityComment> communityCommentList = communityCommentRepository.findByCommunity(findCommunity);
			for (CommunityComment communityComment : communityCommentList) {
				communityComment.setCommunityCommentStateOff();

				List<CommunityCommentLike> commentLikes = communityCommentLikeRepository.findByCommunityComment(
					communityComment);
				for (CommunityCommentLike commentLike : commentLikes) {
					commentLike.setCommunityCommentLikeStateOff();
				}
			}
		} else {

			throw new CustomException(ErrorCode.NO_AUTHORITY);
		}

		log.debug("communityDelete End");
	}

	/**
	 * 특정 커뮤니티 조회
	 *
	 * @param id    게시글 ID
	 * @param token 사용자 토큰
	 * @return 파일업로드 예외
	 */
	@Override
	public UserCommunityDetailDto userCommunityDetails(Long id, String token) {
		log.debug("communityDetails Start");

		// 커뮤니티 조회
		Community findCommunity = communityMethod.getCommunity(id);

		// 커뮤니티 이미지 조회
		List<CommunityImg> imgs = communityImgRepository.findByCommunity(findCommunity);
		List<String> communityImgs = imgs.stream().map(CommunityImg::getImgUrl).collect(Collectors.toList());

		// dish null 체크
		Long dishId = null;
		String dishName = null;

		if (findCommunity.getDish() != null) {
			dishId = findCommunity.getDish().getId();
			dishName = findCommunity.getDish().getDishName();
		}

		// 유저 조회
		User user = communityMethod.getUser(token, false);
		String userCommentImg = "";
		if (user != null) {
			userCommentImg = user.getProfileImageUrl();
		}

		// 커뮤니티 신고여부 확인
		boolean isReport = communityReportRepository.existsByCommunityAndUserAndCommunityReportState(findCommunity,
			user, 0);

		// 커뮤니티 좋아요 여부 확인
		boolean isLike = communityLikeRepository.existsByCommunityAndUserAndCommunityLikeState(findCommunity,
			user, 0);

		// 커뮤니티 스크랩 여부 확인
		boolean isScrap = communityScrapRepository.existsByCommunityAndUserAndCommunityScrapState(findCommunity,
			user, 0);

		// 작성 유저인지 확인
		boolean isUser = findCommunity.getUser().equals(user);

		// 커뮤니티 디테일 조회
		UserCommunityDetailDto result = UserCommunityDetailDto.builder()
			.communityId(findCommunity.getId())
			.communityUserId(findCommunity.getUser().getId())
			.communityCategoryName(findCommunity.getCommunityCategory().getCategoryName())
			.content(findCommunity.getContent())
			.userName(findCommunity.getUser().getNickName())
			.userImg(findCommunity.getUser().getProfileImageUrl())
			.userCommentImg(userCommentImg)
			.likeCount(findCommunity.getLikeCount())
			.commentCount(findCommunity.getCommentCount())
			.reportsCount(findCommunity.getReportsCount())
			.isReport(isReport)
			.isLike(isLike)
			.isScrap(isScrap)
			.isUser(isUser)
			.dishId(dishId)
			.dishName(dishName)
			.communityImgs(communityImgs)
			.createdAt(findCommunity.getCreatedDate())
			.modifiedAt(findCommunity.getLastModifiedDate())
			.build();

		log.debug("communityDetails End");
		return result;
	}

	/**
	 * 커뮤니티 리스트 조회
	 *
	 * @param pageable 페이지 검색을위한 파라미터
	 * @param token    사용자 토큰
	 * @return 카테고리별 커뮤니티 목록
	 */
	@Override
	public Slice<UserCommunityDetailDto> userCommunityList(Pageable pageable, String token, Long tagId) {
		log.debug("communityList Start");
		Slice<UserCommunityDetailDto> result;

		User user = userMethod.getTokenUser(token, false);

		if (tagId == null || tagId == 0) {
			result = communityRepository.findSliceBy(pageable).map(communityMethod.getConverter(user));
		} else {
			CommunityCategory category = communityMethod.getCommunityCategory(tagId);
			result = communityRepository.findSliceByCommunityCategory(pageable, category)
				.map(communityMethod.getConverter(user));
		}

		log.debug("communityList End");
		return result;
	}

	/**
	 * 해당 냥그릇 커뮤니티 리스트 조회
	 *
	 * @param pageable 페이지 검색을위한 파라미터
	 * @param dishId   냥그릇 ID
	 * @param token    사용자 토큰
	 * @return 냥그릇별 커뮤니티 목록
	 */
	@Override
	public Slice<UserCommunityDetailDto> userCommunityDishList(Pageable pageable, Long dishId, String token, Long tagId) {
		log.debug("communityDishList Start");
		Slice<UserCommunityDetailDto> result;

		// 냥그릇 조회
		Dish dish = dishMethod.getDish(dishId);

		// 유저 조회
		User user = userMethod.getTokenUser(token, false);

		if (tagId == null || tagId == 0) {
			result = communityRepository.findSliceByDish(pageable, dish).map(communityMethod.getConverter(user));
		} else {
			CommunityCategory category = communityMethod.getCommunityCategory(tagId);
			result = communityRepository.findSliceByDishAndCommunityCategory(pageable, dish, category)
				.map(communityMethod.getConverter(user));
		}

		log.debug("communityDishList End");
		return result;
	}

	/**
	 * 스크랩한 커뮤니티 리스트 조회
	 *
	 * @param pageable 페이지 검색을위한 파라미터
	 * @param token    사용자 토큰
	 * @return 사용자가 스크랩한 커뮤니티 목록
	 */
	@Override
	public Slice<UserCommunityDetailDto> userCommunityScrapList(Pageable pageable, String token) {
		log.debug("communityScrapList Start");

		// 유저 조회
		User user = userMethod.getTokenUser(token, true);

		// 사용자가 스크랩한 커뮤니티 목록 조회
		Slice<UserCommunityDetailDto> result = communityScrapRepository.findSliceByUser(pageable, user)
			.map(CommunityScrap::getCommunity)
			.map(communityMethod.getConverter(user));

		log.debug("communityScrapList End");
		return result;
	}

	@Override
	public Slice<UserCommunityDetailDto> userCommunityUserList(Pageable pageable, String token) {
		log.debug("communityScrapList Start");

		// 유저 조회
		User user = userMethod.getTokenUser(token, true);

		// 사용자가 작성한 커뮤니티 목록 조회
		Slice<Community> communityUser = communityMethod.getCommunityUser(pageable, user);
		Slice<UserCommunityDetailDto> result = communityUser.map(communityMethod.getConverter(user));

		log.debug("communityScrapList End");

		return result;
	}
}
