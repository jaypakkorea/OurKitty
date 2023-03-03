package com.nyang.auth.exception.common;

import com.nyang.auth.exception.constants.ErrorCode;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class CustomException extends RuntimeException {

	private final ErrorCode errorCode;

}
