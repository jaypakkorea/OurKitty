package com.nyang.auth.exception.constants;

import lombok.AllArgsConstructor;
import lombok.Getter;

//공통 에러 코드
@AllArgsConstructor
@Getter
public enum ErrorCode {

	// 400 : 잘못된 요청
	REQUEST_PARAMETER(400,"요청 파라미터 값이 올바르지 않습니다."),

	// 401 : 접근 권한이 없음
	NO_AUTHORITY(401, "접근 권한이 없습니다." ),
	TOKEN_EXPIRED(401, "엑세스 토큰의 기간이 만료되었습니다." ),
	REFRESH_EXPIRED(401, "리프레쉬 토큰의 기간이 만료되었습니다." ),

	// 404: 잘못된 리소스 접근
	NOT_FOUND_DTO(404, "해당 객체를 찾지 못했습니다."), // 공통,

	//409 : 중복된 리소스
	ALREADY_SAVED_DTO(409, "이미 저장된 객체입니다."),

	// 500: INTERNAL SERVER ERROR,
	INTERNAL_SERVER_ERROR(500, "서버 내부 에러입니다.");


	private final int status;
	private final String message;
}


