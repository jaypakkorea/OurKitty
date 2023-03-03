package com.nyang.cat.dev.alarms.service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.nyang.cat.dev.admins.repository.AdminRepository;
import com.nyang.cat.dev.alarms.dto.AlarmDto;
import com.nyang.cat.dev.alarms.repository.AdminAlarmRepository;
import com.nyang.cat.dev.alarms.repository.AlarmHistoryRepository;
import com.nyang.cat.dev.alarms.repository.UserAlarmRepository;
import com.nyang.cat.dev.dishes.repository.DishLikeRepository;
import com.nyang.cat.dev.users.repository.UserRepository;
import com.nyang.cat.dev.util.AlarmContent;
import com.nyang.cat.dev.util.constants.AlarmConstants;
import com.nyang.cat.dev.util.constants.AlarmType;
import com.nyang.cat.domain.Admin;
import com.nyang.cat.domain.AdminAlarm;
import com.nyang.cat.domain.AlarmHistory;
import com.nyang.cat.domain.DishLike;
import com.nyang.cat.domain.User;
import com.nyang.cat.domain.UserAlarm;
import com.nyang.cat.exception.common.CustomException;
import com.nyang.cat.exception.constants.ErrorCode;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class AlarmAddServiceImpl implements AlarmAddService {

	private final AdminAlarmRepository adminAlarmRepository;
	private final AdminRepository adminRepository;
	private final UserAlarmRepository userAlarmRepository;
	private final UserRepository userRepository;
	private final DishLikeRepository dishLikeRepository;
	private final AlarmHistoryRepository alarmHistoryRepository;

	/**
	 * 알람을 추가하기 위한 메서드 알람 타입과 정보들을 받아서 메세지, 링크를 만들어 저장
	 * @param alarmType        알람 종류
	 * @param targetId        알람의 타겟 객체의 아이디 값 (게시글, 냥그릇)
	 * @param receiverId    알람을 받을 관리자 혹은 유저의 아이디 값
	 * @param imageUrl        알람의 이미지 경로 (필수 X)
	 * @param values        알람의 내용에 사용될 문자열들
	 */
	@Transactional
	@Override
	public void addAlarm(AlarmType alarmType, Long targetId, Long receiverId, String imageUrl, Long targetUserId,
		String... values) {

		// 해당 종류의 알람이 이전에 저장된 이후로 충분한 시간이 흘러 새롭게 생성할 수 있는 지 확인
		if (!checkAlarmTiming(targetId, alarmType.getCode())) {
			return;
		}

		// 알람 내용 설정
		String content = AlarmContent.makeAlarmContent(alarmType, values);
		// 알람 URL 설정
		String targetUrl = makeAlarmUrl(alarmType, targetId);
		// 타겟 유저 URL 설정
		String targetUserUrl = targetUserId != null ? targetUserId.toString() : null;

		// 알람 기록을 저장
		alarmHistoryRepository.save(
			AlarmHistory.builder().targetId(targetId).alarmType(alarmType.getCode()).content(content).build());

		// 저장할 알람 내용을 DTO 로 생성
		AlarmDto alarmDto = AlarmDto.builder()
			.content(content)
			.imgUrl(imageUrl)
			.targetUrl(targetUrl)
			.targetUserUrl(targetUserUrl)
			.alarmType(alarmType.getCode())
			.build();

		if (alarmType.getReceiver().equals(1)) {
			// 관리자 알람
			addAdminAlarm(alarmDto, receiverId);

		} else if (alarmType.getReceiver().equals(2)) {
			// 사용자 알람
			if (alarmType.getTarget().equals(1)) {
				// 냥그릇 알람
				addUserDishAlarm(alarmDto, targetId);
			} else if (alarmType.getTarget().equals(2)) {
				// 게시글 알람
				addUserAlarm(alarmDto, receiverId);
			}

		} else {
			log.error("알람 생성 중 오류 발생 올바르지 않은 alarmType");
			throw new CustomException(ErrorCode.INTERNAL_SERVER_ERROR);
		}

	}

	/**
	 * 사용자가 좋아요한 냥그릇에 대한 알람들을 추가하는 메서드
	 * @param alarmDto    알람 내용을 담은 DTO
	 * @param dishId    좋아요한 사용자들 목록을 불러오기 위한 냥그릇 ID
	 */
	private void addUserDishAlarm(AlarmDto alarmDto, Long dishId) {

		List<DishLike> dishLikeList = dishLikeRepository.findDishLikesByUser_Id(dishId);

		for (DishLike dishLike : dishLikeList) {

			userAlarmRepository.save(UserAlarm.builder()
				.user(dishLike.getUser())
				.content(alarmDto.getContent())
				.imgUrl(alarmDto.getImgUrl())
				.targetUrl(alarmDto.getTargetUrl())
				.alarmCode(alarmDto.getAlarmType())
				.build());
		}

	}

	/**
	 * 사용자 알람을 추가하는 메서드
	 * @param alarmDto    알람의 내용
	 * @param userId    알람을 받을 유저 ID
	 */
	private void addUserAlarm(AlarmDto alarmDto, Long userId) {

		User user = userRepository.getReferenceById(userId);

		userAlarmRepository.save(UserAlarm.builder()
			.user(user)
			.content(alarmDto.getContent())
			.imgUrl(alarmDto.getImgUrl())
			.targetUrl(alarmDto.getTargetUrl())
			.alarmCode(alarmDto.getAlarmType())
			.build());
	}

	/**
	 * 관리자 그룹에 속한 관리자들에게 알람을 추가하는 메서드
	 * @param alarmDto    알람의 내용
	 * @param groupId    알람을 받을 관리자 그룹
	 */
	private void addAdminAlarm(AlarmDto alarmDto, Long groupId) {

		List<Admin> adminList = adminRepository.findAdminsByGroup_Id(groupId);

		for (Admin admin : adminList) {

			adminAlarmRepository.save(AdminAlarm.builder()
				.admin(admin)
				.content(alarmDto.getContent())
				.imgUrl(alarmDto.getImgUrl())
				.targetUrl(alarmDto.getTargetUrl())
				.alarmCode(alarmDto.getAlarmType())
				.build());
		}
	}

	private boolean checkAlarmTiming(Long targetId, Integer alarmType) {

		Optional<AlarmHistory> alarmHistoryOptional = alarmHistoryRepository.findTop1ByTargetIdAndAlarmTypeOrderByCreatedDateDesc(
			targetId, alarmType);

		if (alarmHistoryOptional.isPresent()) {
			long diff = Duration.between(alarmHistoryOptional.get().getCreatedDate(), LocalDateTime.now()).toHours();

			return diff >= AlarmConstants.ALARM_MIN_HOURS_TO_CREATE;

		} else {
			return true;
		}
	}

	/**
	 * 알람의 direct url 을 만들어주는 메서드
	 * @param alarmType    url 을 만들 알람 종류
	 * @param id        알람의 타겟의 아이디
	 * @return 알람의 direct url
	 */
	private String makeAlarmUrl(AlarmType alarmType, Long id) {

		if (alarmType.getTarget().equals(1)) {
			// 냥그릇에 대한 알람
			if (alarmType.getReceiver().equals(2)) {
				// 받는 사람이 유저
				return AlarmConstants.USER_DISH_URL + id;
			} else if (alarmType.getReceiver().equals(1)) {
				// 받는 사람이 관리자
				return AlarmConstants.ADMIN_DISH_URL + id;
			}

		} else if (alarmType.getTarget().equals(2)) {
			// 게시글에 대한 알람
			return AlarmConstants.COMMUNITY_URL + id;
		}

		log.error("알람 타겟 URL 생성 중 알람 타입 에러 발생");
		throw new CustomException(ErrorCode.INTERNAL_SERVER_ERROR);
	}
}
