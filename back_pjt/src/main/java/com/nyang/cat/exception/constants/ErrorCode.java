package com.nyang.cat.exception.constants;

import org.springframework.http.HttpStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;

//공통 에러 코드
@AllArgsConstructor
@Getter
public enum ErrorCode {

	// 400 : 잘못된 요청
	REQUEST_PARAMETER(400,"요청 파라미터 값이 올바르지 않습니다."),

	NO_DISH_NAME(400, "냥그릇 이름 정보가 없습니다."),

	// 401 : 접근 권한이 없음
	NO_AUTHORITY(401, "접근 권한이 없습니다." ),

	// 404: 잘못된 리소스 접근
	NOT_FOUND_ENTITY(404, "해당 객체를 찾지 못했습니다."), // 공통,

	// 404: 한번도 위치 정보를 발송하지 않은 기기를 등록
	NOT_FOUND_LOCATION_INFO(404, "해당 냥그릇으로 부터 받은 위치 정보가 없습니다."), // 공통,

	//409 : 중복된 리소스
	ALREADY_SAVED_DTO(409, "이미 저장된 객체입니다."),
	ALREADY_BLOCKED_COMMUNITY(409, "이미 삭제 처리된 게시글입니다."),
	ALREADY_UNBLOCKED_COMMUNITY(409, "블락 해제할 수 없는 글입니다."),

	// 500: INTERNAL SERVER ERROR,
	IMAGE_UPLOAD_FAIL(500, "파일 서버에 이미지 업로드 실패했습니다."),
	INTERNAL_SERVER_ERROR(500, "서버 내부 에러입니다."),
	NOT_CREATED_ERROR(500, "서버 관리자에게 문의해주세요."),
	NOT_RETRIEVE_ERROR(500, "서버 관리자에게 문의해주세요."),
	NOT_UPDATED_ERROR(500, "서버 관리자에게 문의해주세요."),
	NOT_DELETED_ERROR(500, "서버 관리자에게 문의해주세요.");



	private final int status;
	private final String message;
}
