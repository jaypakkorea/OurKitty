package com.nyang.cat.dev.util.constants;

public class AlarmConstants {

	// 같은 target 에 대한 같은 type 의 알림이 다시 생성될 수 있는 최소 시간
	public final static Integer ALARM_MIN_HOURS_TO_CREATE = 24;

	// 알람에서 보여줄 게시글 내용의 최대 길이
	public final static Integer ALARM_COMMUNITY_MAX_LENGTH = 10;

	// 알람에서 보여줄 댓글 내용의 최대 길이
	public final static Integer ALARM_COMMENT_MAX_LENGTH = 20;

	// 유저 냥그릇 상세 정보 페이지 URL
	public final static String USER_DISH_URL = "/map/dish/1/";

	// 관리자 냥그릇 상세 정보 페이지 URL
	public final static String ADMIN_DISH_URL = "/catadmin/catlist/";

	// 게시글 상세 보기 페이지 URL
	public final static String COMMUNITY_URL = "/community/detail/";
}
