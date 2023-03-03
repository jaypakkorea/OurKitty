package com.nyang.auth.dev.jwt.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthDto {
	private String id;
	private String provider;
	private String picture;
}
