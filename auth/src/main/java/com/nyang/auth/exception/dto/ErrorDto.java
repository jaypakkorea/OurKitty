package com.nyang.auth.exception.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class ErrorDto {
	private final int status;
	private final String message;
}

