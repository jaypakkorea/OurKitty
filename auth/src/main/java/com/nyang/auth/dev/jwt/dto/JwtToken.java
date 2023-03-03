package com.nyang.auth.dev.jwt.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder
public class JwtToken {
	private String token;
	private String refreshToken;
}

