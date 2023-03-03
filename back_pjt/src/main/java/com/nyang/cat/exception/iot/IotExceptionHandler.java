package com.nyang.cat.exception.iot;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.nyang.cat.exception.dto.ErrorDto;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestControllerAdvice
public class IotExceptionHandler extends RuntimeException {

	@ExceptionHandler({ ImageUploadFailureException.class })
	protected ResponseEntity<?> handleImageUploadFailureException(ImageUploadFailureException ex) {
		return new ResponseEntity(new ErrorDto(ex.getErrorCode().getStatus(), ex.getErrorCode().getMessage()), HttpStatus.valueOf(ex.getErrorCode().getStatus()));
	}

}
