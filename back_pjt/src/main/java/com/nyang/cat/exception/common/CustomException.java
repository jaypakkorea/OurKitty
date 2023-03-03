package com.nyang.cat.exception.common;

import java.util.HashMap;

import com.nyang.cat.exception.constants.ErrorCode;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class CustomException extends RuntimeException {

	private final ErrorCode errorCode;

}
