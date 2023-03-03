package com.nyang.cat.dev.communities.service.user;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.nyang.cat.dev.alarms.service.AlarmAddServiceImpl;
import com.nyang.cat.dev.communities.dto.user.UserCommunityReportDto;
import com.nyang.cat.dev.communities.repository.CommunityImgRepository;
import com.nyang.cat.dev.communities.repository.CommunityLikeRepository;
import com.nyang.cat.dev.communities.repository.CommunityReportRepository;
import com.nyang.cat.dev.communities.repository.CommunityScrapRepository;
import com.nyang.cat.dev.communities.service.common.CommunityMethod;
import com.nyang.cat.dev.util.constants.AlarmType;
import com.nyang.cat.domain.Community;
import com.nyang.cat.domain.CommunityImg;
import com.nyang.cat.domain.CommunityLike;
import com.nyang.cat.domain.CommunityReport;
import com.nyang.cat.domain.CommunityScrap;
import com.nyang.cat.domain.User;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class UserCommunityActionServiceImpl implements UserCommunityActionService {

	private final CommunityReportRepository communityReportRepository;
	private final CommunityLikeRepository communityLikeRepository;
	private final CommunityScrapRepository communityScrapRepository;
	private final CommunityImgRepository communityImgRepository;

	private final AlarmAddServiceImpl alarmAddService;

	private final CommunityMethod communityMethod;

	/**
	 * 커뮤니티 좋아요 클릭
	 *
	 * @param id 커뮤니티 ID
	 */
	@Override
	public void communityLike(Long id, String token) {
		log.debug("communityLike Start");

		// 유저 조회
		User user = communityMethod.getUser(token, true);
		log.debug("communityLike 유저조회 성공");

		// 커뮤니티 조회
		Community findCommunity = communityMethod.getCommunity(id);
		log.debug("communityLike 커뮤니티조회 성공");

		// 커뮤니티 좋아요 클릭
		communityLike(findCommunity, user);

		log.debug("communityLike End");
	}

	@Override
	public void communityReport(Long id, UserCommunityReportDto userCommunityReportDto, String token) {
		log.debug("communityReport Start");

		// 유저 조회
		User user = communityMethod.getUser(token, true);

		// 커뮤니티 조회
		Community findCommunity = communityMethod.getCommunity(id);

		// 커뮤니티 신고 클릭
		communityReport(findCommunity, user, userCommunityReportDto);

		log.debug("communityReport End");
	}

	@Override
	public void communityScrap(Long id, String token) {
		log.debug("communityScrap Start");

		// 유저 조회
		User user = communityMethod.getUser(token, true);

		// 커뮤니티 조회
		Community findCommunity = communityMethod.getCommunity(id);

		// 커뮤니티 스크랩 클릭
		communityScrap(findCommunity, user);

		log.debug("communityScrap End");
	}

	/**
	 * 커뮤니티 좋아요 클릭
	 *
	 * @param community 해당 커뮤니티
	 */
	private void communityLike(Community community, User user) {
		log.debug("communityLike2 Start");

		// 유저가 해당 커뮤니티를 좋아요를 클릭했는지 확인
		Optional<CommunityLike> communityLikeFind = communityLikeRepository.findByCommunityAndUser(community, user);
		log.debug("유저가 좋아요한 커뮤니티 조회성공");

		// 클릭한적이 없는경우
		if (communityLikeFind.isEmpty()) {
			log.debug("유저가 커뮤니티 좋아요를 클릭한적이 없는 경우");

			// 커뮤니티를 communityLikeRepository에 추가
			CommunityLike communityLike = CommunityLike.builder().user(user).community(community).build();
			communityLikeRepository.save(communityLike);

			// 커뮤니티 좋아요 +1
			community.setCommunityLikeCountPlus();

			// 게시글 좋아요 알람
			addCommunityLikeAlarm(community, user);
		}
		// 이미 한번 이상 클릭한 경우
		else {
			log.debug("유저가 커뮤니티 좋아요를 클릭한적이 있는 경우");
			CommunityLike communityLike = communityLikeFind.get();

			if (communityLike.getCommunityLikeState() == 0) {
				communityLike.setCommunityLikeStateOff();
				community.setCommunityLikeCountMinus();
			} else {
				communityLike.setCommunityLikeStateOn();
				community.setCommunityLikeCountPlus();

				// 게시글 좋아요 알람
				addCommunityLikeAlarm(community, user);
			}
		}
	}

	/**
	 * 커뮤니티 신고 클릭
	 *
	 * @param community 해당 커뮤니티
	 */
	private void communityReport(Community community, User user, UserCommunityReportDto userCommunityReportDto) {
		// 유저가 해당 커뮤니티를 신고했는지 확인
		Optional<CommunityReport> communityReportFind = communityReportRepository.findByCommunityAndUser(community,
			user);
		// 클릭한적이 없는경우
		if (communityReportFind.isEmpty()) {

			// dish null 체크
			Long dishId = null;

			if (community.getDish() != null) {
				dishId = community.getDish().getId();
			}

			// 커뮤니티를 communityReportRepository에 추가
			CommunityReport communityReport = CommunityReport.builder()
				.community(community)
				.user(user)
				.reportsContent(userCommunityReportDto.getContent())
				.dishId(dishId)
				.build();
			communityReportRepository.save(communityReport);

			// 커뮤니티 신고수 +1
			community.setCommunityReportCountPlus();

			// 만약 커뮤니티의 신고수가 5이상이 되었다면 커뮤니티를 비활성화한다.
			if (community.getReportsCount() >= 5) {
				community.blockCommunity();
				addCommunityBlockAlarm(community);
			}
		}
	}

	/**
	 * 커뮤니티 스크랩 클릭
	 *
	 * @param community 해당 커뮤니티
	 */
	private void communityScrap(Community community, User user) {
		// 유저가 해당 커뮤니티를 스크랩했는지 확인
		Optional<CommunityScrap> communityScrapFind = communityScrapRepository.findByCommunityAndUser(community, user);

		// 클릭한적이 없는경우
		if (communityScrapFind.isEmpty()) {
			// 커뮤니티를 communityScrapRepository에 추가
			CommunityScrap communityScrap = CommunityScrap.builder().user(user).community(community).build();
			communityScrapRepository.save(communityScrap);
		}
		// 한번이상 클릭한 경우
		else {
			CommunityScrap communityScrap = communityScrapFind.get();

			// 커뮤니티 스크랩상태 여부 변경
			if (communityScrap.getCommunityScrapState() == 0) {
				communityScrap.setCommunityReportStateOff();
			} else {
				communityScrap.setCommunityReportStateOn();
			}
		}
	}

	/**
	 * 커뮤니티 좋아요 알람 생성하는 메서드
	 *
	 * @param community 타겟 게시글
	 * @param user      좋아요 누른 유저
	 */
	private void addCommunityLikeAlarm(Community community, User user) {

		String imgUrl = getTopImage(community);

		// 알람 추가
		alarmAddService.addAlarm(AlarmType.USER_COMMUNITY_LIKE, community.getId(), community.getUser().getId(), imgUrl,
			user.getId(), community.getContent(), user.getNickName());
	}

	private void addCommunityBlockAlarm(Community community) {

		String imgUrl = getTopImage(community);

		List<User> users = communityReportRepository.findByCommunity(community)
			.stream()
			.map(CommunityReport::getUser)
			.collect(Collectors.toList());

		users.add(community.getUser());

		for (User user : users) {
			alarmAddService.addAlarm(AlarmType.USER_COMMUNITY_REPORT_BLOCK, community.getId(), user.getId(), imgUrl,
				null, community.getContent());
		}
	}

	private String getTopImage(Community community) {

		// 해당 게시글의 이미지가 있는 경우 첫번째 이미지, 없는 경우 null
		return communityImgRepository.findByCommunity(community)
			.stream()
			.findFirst()
			.map(CommunityImg::getImgUrl)
			.orElse(null);
	}
}
