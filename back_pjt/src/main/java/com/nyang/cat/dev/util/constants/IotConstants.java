package com.nyang.cat.dev.util.constants;

public class IotConstants {

	// 위치 이동 여부를 판단하기 위한 상수
	public final static Double LOCATION_CHANGE_LIMIT = 0.001;

	// 무게 변화 여부를 판단하기 위한 상수
	public final static Double WEIGHT_CHANGE_LIMIT = 10.0;

	// 최대 무게 상수
	public final static Double MAX_WEIGHT = 800.0;

	// 최소 무게 상수
	public final static Double MIN_WEIGHT = 0.0;

	// 무게 경고 상수
	public final static Double WARNING_WEIGHT = 40.0;

	// 무게 변화가 없어도 관리자에게 알람이 가지 않는 최대 시간
	public final static Integer MAX_HOUR_NO_CHANGE_WEIGHT = 168;

	// 무게 변화가 없이도 사용자에게 알람이 가지 않는 최대 시간
	public final static Integer MAX_HOUR_NO_CHANGE_WEIGHT_BUT_PICTURE = 48;
}
