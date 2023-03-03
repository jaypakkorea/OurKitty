package com.nyang.auth.exception.common;

import static com.nyang.auth.exception.constants.ErrorCode.*;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.nyang.auth.exception.dto.ErrorDto;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestControllerAdvice
public class CommonExceptionHandler {

	//	@ExceptionHandler({ NotFoundDtoException.class })
	//	protected ResponseEntity<?> handleNotFoundDtoException(NotFoundDtoException ex) {
	//		log.debug("해당 DTO를 조회할 수 없습니다. {}", ex.getObject());
	//
	//		return new ResponseEntity(new ErrorDto(ex.getErrorCode().getStatus(), ex.getErrorCode().getMessage()), HttpStatus.valueOf(ex.getErrorCode().getStatus()));
	//	}

	/**
	 *
	 * @param  ex
	 * @return 에러메시지
	 */
	@ExceptionHandler({CustomException.class})
	protected ResponseEntity handleCustomException(CustomException ex) {

		//return ResponseEntity.status(HttpStatus.valueOf(ex.getErrorCode().getStatus())).body(new ErrorDto(ex.getErrorCode().getStatus(), ex.getErrorCode().getMessage()));
		return new ResponseEntity(new ErrorDto(ex.getErrorCode().getStatus(), ex.getErrorCode().getMessage()),
			HttpStatus.valueOf(ex.getErrorCode().getStatus()));
	}

	@ExceptionHandler({Exception.class})
	protected ResponseEntity handleServerException(Exception ex) {
		return new ResponseEntity(new ErrorDto(INTERNAL_SERVER_ERROR.getStatus(), INTERNAL_SERVER_ERROR.getMessage()),
			HttpStatus.INTERNAL_SERVER_ERROR);
	}

}
