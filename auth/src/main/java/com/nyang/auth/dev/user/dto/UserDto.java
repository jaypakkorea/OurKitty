package com.nyang.auth.dev.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDto {

	private Long id;
	private String profileImg;
	private String nickName;
	private Boolean isAgree;
}
