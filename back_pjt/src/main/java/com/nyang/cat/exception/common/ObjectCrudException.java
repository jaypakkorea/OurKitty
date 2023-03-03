package com.nyang.cat.exception.common;

import com.nyang.cat.exception.constants.ErrorCode;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class ObjectCrudException extends RuntimeException{
	private final ErrorCode errorCode;
	private final Object object;
}
