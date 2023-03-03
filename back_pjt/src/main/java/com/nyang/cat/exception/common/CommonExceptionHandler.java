package com.nyang.cat.exception.common;

import static com.nyang.cat.exception.constants.ErrorCode.*;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MissingRequestHeaderException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.nyang.cat.exception.dto.ErrorDto;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestControllerAdvice
public class CommonExceptionHandler {

	@ExceptionHandler({ ObjectCrudException.class })
	protected ResponseEntity<?> handleNotFoundDtoException(ObjectCrudException ex) {
		log.debug("에러코드: {}, Object: {}", ex.getErrorCode(), ex.getObject());
		return new ResponseEntity(new ErrorDto(ex.getErrorCode().getStatus(), ex.getErrorCode().getMessage()), HttpStatus.valueOf(ex.getErrorCode().getStatus()));
	}

	/**
	 *
	 * @param  ex
	 * @return 에러메시지
	 */
	@ExceptionHandler({CustomException.class})
	protected ResponseEntity handleCustomException(CustomException ex) {
		ex.printStackTrace();
		//return ResponseEntity.status(HttpStatus.valueOf(ex.getErrorCode().getStatus())).body(new ErrorDto(ex.getErrorCode().getStatus(), ex.getErrorCode().getMessage()));
		return new ResponseEntity(new ErrorDto(ex.getErrorCode().getStatus(), ex.getErrorCode().getMessage()), HttpStatus.valueOf(ex.getErrorCode().getStatus()));
	}

	@ExceptionHandler({ Exception.class })
	protected ResponseEntity handleServerException(Exception ex) {
		ex.printStackTrace();
		return new ResponseEntity(new ErrorDto(INTERNAL_SERVER_ERROR.getStatus(), INTERNAL_SERVER_ERROR.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@ExceptionHandler({ MissingRequestHeaderException.class})
	protected ResponseEntity handleHeaderException(Exception ex){
		ex.printStackTrace();
		return new ResponseEntity(new ErrorDto(NO_AUTHORITY.getStatus(), NO_AUTHORITY.getMessage()), HttpStatus.UNAUTHORIZED);
	}

}
