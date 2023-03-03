package com.nyang.cat.dev.util;

import com.nyang.cat.dev.util.constants.AlarmConstants;
import com.nyang.cat.dev.util.constants.AlarmType;
import com.nyang.cat.exception.common.CustomException;
import com.nyang.cat.exception.constants.ErrorCode;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class AlarmContent {

	/**
	 * 알람 메시지 내용을 만들어주는 메서드
	 * @param alarmType        알람의 종류
	 * @param values        알람의 내용에 들어갈 변수들을 가변 변수 형태로
	 * @return 알람의 내용을 반환
	 */
	public static String makeAlarmContent(AlarmType alarmType, String... values) {

		checkValues(values.length, alarmType.getNeedValues());

		switch (alarmType) {
			case ADMIN_DISH_LOCATION_CHANGE:
				return adminDishLocationChange(values);
			case ADMIN_DISH_DATA_NO_CHANGE:
				return adminDishDataNoChange(values);
			case ADMIN_DISH_NO_PICTURE:
				return adminDishNoPicture(values);
			case ADMIN_COMMUNITY_REPORTS:
				return adminCommunityReports(values);
			case USER_LIKE_DISH_LOW_FOOD:
				return userDishLowFood(values);
			case USER_LIKE_DISH_HUNGRY_CAT:
				return userDishHungryCat(values);
			case USER_COMMUNITY_LIKE:
				return userCommunityLike(values);
			case USER_COMMUNITY_COMMENT:
				return userCommunityComment(values);
			case USER_COMMUNITY_REPORT_BLOCK:
				return userCommunityReportBlock(values);
			case USER_COMMUNITY_REPORT_DELETE:
				return userCommunityReportDelete(values);
			case USER_COMMUNITY_REPORT_UNDO:
				return userCommunityReportUndo(values);
			default:
				throw new RuntimeException();
		}
	}

	/**
	 * 냥그릇 위치 변화에 따른 관리자 알람
	 * @param values    냥그릇 이름, 기존의 경도, 기존의 위도, 변경된 경도, 변경된 위도
	 * @return 알람 내용
	 */
	private static String adminDishLocationChange(String... values) {
		return "관리중인 냥그릇 " + values[0] + "이(가) 이전 위치 (" + values[1] + ", " + values[2] + ") 에서 (" + values[3]
			+ ", " + values[4] + ") 으로 이동했습니다.";
	}

	/**
	 * 일주일간 냥그릇의 무게 정보 변화가 없는 경우 관리자 알람
	 * @param values    냥그릇 이름
	 * @return 알람 내용
	 */
	private static String adminDishDataNoChange(String... values) {
		return "관리중인 냥그릇 " + values[0] + "의 일주일간 데이터의 변화가 없습니다.";
	}

	/**
	 * 일주일간 냥그릇에 찍힌 고양이가 없는 경우 관리자 알람
	 * @param values    냥그릇 이름
	 * @return 알람 내용
	 */
	private static String adminDishNoPicture(String... values) {
		return "관리중인 냥그릇 " + values[0] + "에 방문한 고양이가 일주일간 없습니다.";
	}

	/**
	 * 5회 신고 누적으로 블락된 게시글이 있는 경우 관리자 알람
	 * @param values    게시글 번호
	 * @return 알람 내용
	 */
	private static String adminCommunityReports(String... values) {
		return "게시글 " + values[0] + "번이 5회 신고 누적으로 블락처리 되었습니다.";
	}

	/**
	 * 좋아요한 냥그릇의 사료량이 일정량 이하가 된 경우 유저 알람
	 * @param values    냥그릇 이름
	 * @return 알람 내용
	 */
	private static String userDishLowFood(String... values) {
		return "냥그릇 " + values[0] + "에 사료가 없어요.";
	}

	/**
	 * 좋아요한 냥그릇의 무게가 일정량 이하인데 고양이가 방문하여 사진이 찍힌 경우 사용자 알람
	 * @param values    냥그릇 이름
	 * @return 알람 내용
	 */
	private static String userDishHungryCat(String... values) {
		return "냥그릇 " + values[0] + "에서 사료를 기다리는 고양이가 있어요!";
	}

	/**
	 * 자신의 게시글에 다른 유저가 좋아요를 누른 경우 유저 알람
	 * @param values    // 게시글 내용, 좋아요를 누른 유저의 닉네임
	 * @return            // 알람 내용
	 */
	private static String userCommunityLike(String... values) {
		return "게시글 \"" +
			handleString(values[0], AlarmConstants.ALARM_COMMUNITY_MAX_LENGTH) +
			"\"을 " +
			values[1] +
			" 님이 좋아합니다!";
	}

	/**
	 * 자신의 게시글에 다른 유저가 댓글을 작성한 경우 유저 알람
	 * @param values    // 게시글 내용, 댓글을 작성한 유저의 닉네임, 댓글 내용
	 * @return            // 알람 내용
	 */
	private static String userCommunityComment(String... values) {
		return "게시글 \"" +
			handleString(values[0], AlarmConstants.ALARM_COMMUNITY_MAX_LENGTH) +
			"\"에 " +
			values[1] +
			" 님의 댓글 \"" +
			handleString(values[2], AlarmConstants.ALARM_COMMENT_MAX_LENGTH) +
			"\"";
	}

	/**
	 * 자신의 게시글 혹은 자신이 신고한 게시글이 신고 5회 누적으로 블락 처리된 경우 사용자 알람
	 * @param values    // 게시글 내용
	 * @return            // 알람 내용
	 */
	private static String userCommunityReportBlock(String... values) {
		return "게시글 \"" +
			handleString(values[0], AlarmConstants.ALARM_COMMUNITY_MAX_LENGTH) +
			"\"이 블락처리 되었습니다.";
	}

	/**
	 * 자신의 게시글 혹은 자신이 신고한 게시글이 신고 5회 누적으로 블락 처리된 후 삭제된 경우 유저 알람
	 * @param values    // 게시글 내용
	 * @return            // 알람 내용
	 */
	private static String userCommunityReportDelete(String... values) {
		return "게시글 \"" +
			handleString(values[0], AlarmConstants.ALARM_COMMUNITY_MAX_LENGTH) +
			"\"이 신고 누적 후 삭제 되었습니다.";
	}

	/**
	 * 자신의 게시글 혹은 자신이 신고한 게시글이 신고 5회 누적으로 블락 처리된 후 복구된 경우 유저 알람
	 * @param values    // 게시글 내용
	 * @return            // 알람 내용
	 */
	private static String userCommunityReportUndo(String... values) {
		return "게시글 \"" +
			handleString(values[0], AlarmConstants.ALARM_COMMUNITY_MAX_LENGTH) +
			"\"이 신고 누적 후 복구 되었습니다.";
	}

	/**
	 * 알람에 게시글 내용, 댓글 내용을 보여줄 때 내용을 일정 길이만큼 잘라서 보여주기 위해 문자열을 자르는 메서드
	 * @param string    원본 문자열
	 * @param length    최대 허용 길이
	 * @return 잘라진 문자열 혹은 원본 문자열
	 */
	private static String handleString(String string, Integer length) {

		if (string.length() > length) {
			return string.substring(0, length) + "...";
		} else {
			return string;
		}
	}

	/**
	 * 알람 컨텐츠 생성 시 알람별로 필요한 value 개수 만큼의 값이 들어 왔는지 확인
	 * @param size        받아온 값 수
	 * @param target    필요한 값 수
	 */
	private static void checkValues(Integer size, Integer target) {
		// 받아온 값과 필요한 값이 다르면 에러 발생
		if (!size.equals(target)) {
			log.error("알람 컨텐츠 생성 중 가변인자 수 에러 발생");
			throw new CustomException(ErrorCode.INTERNAL_SERVER_ERROR);
		}
	}
}
