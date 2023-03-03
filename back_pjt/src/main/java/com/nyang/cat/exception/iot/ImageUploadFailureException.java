package com.nyang.cat.exception.iot;

import com.nyang.cat.exception.constants.ErrorCode;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class ImageUploadFailureException extends RuntimeException{
	private final ErrorCode errorCode;
}
