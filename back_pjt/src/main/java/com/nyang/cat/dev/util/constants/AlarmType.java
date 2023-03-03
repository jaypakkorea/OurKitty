package com.nyang.cat.dev.util.constants;

import io.swagger.models.auth.In;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum AlarmType {

	// 냥그릇 위치 변화에 따른 관리자 알람
	ADMIN_DISH_LOCATION_CHANGE(1, 1, 5, 111),

	// 일주일간 냥그릇의 무게 정보 변화 혹은 사진 데이터 추가가 없는 경우 관리자 알람
	ADMIN_DISH_DATA_NO_CHANGE(1, 1, 1, 112),

	// 일주일간 냥그릇에 찍힌 고양이가 없는 경우 관리자 알람
	ADMIN_DISH_NO_PICTURE(1, 1, 1, 113),

	// 5회 신고 누적으로 블락된 게시글이 있는 경우 관리자 알람
	ADMIN_COMMUNITY_REPORTS(1, 2, 1, 121),

	// 좋아요한 냥그릇의 사료량이 일정량 이하가 된 경우 유저 알람
	USER_LIKE_DISH_LOW_FOOD(2, 1, 1, 211),

	// 좋아요한 냥그릇의 무게가 일정량 이하인데 고양이가 방문하여 사진이 찍힌 경우 사용자 알람
	USER_LIKE_DISH_HUNGRY_CAT(2, 1, 1, 212),

	// 자신의 게시글에 다른 유저가 좋아요를 누른 경우 유저 알람
	USER_COMMUNITY_LIKE(2, 2, 2, 221),

	// 자신의 게시글에 다른 유저가 댓글을 작성한 경우 유저 알람
	USER_COMMUNITY_COMMENT(2, 2, 3, 222),

	// 자신의 게시글 혹은 자신이 신고한 게시글이 신고 5회 누적으로 블락 처리된 경우 사용자 알람
	USER_COMMUNITY_REPORT_BLOCK(2, 2, 1, 223),

	// 자신의 게시글 혹은 자신이 신고한 게시글이 신고 5회 누적으로 블락 처리된 후 삭제된 경우 유저 알람
	USER_COMMUNITY_REPORT_DELETE(2, 2, 1, 224),

	// 자신의 게시글 혹은 자신이 신고한 게시글이 신고 5회 누적으로 블락 처리된 후 복구된 경우 유저 알람
	USER_COMMUNITY_REPORT_UNDO(2, 2, 1, 225);

	private final Integer receiver;
	private final Integer target;
	private final Integer needValues;
	private final Integer code;

}
