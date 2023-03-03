package com.nyang.cat.dev.users.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class UserProfile {

	private Long id;

	private String profileImg;
	private String nickName;

	private Boolean isUser;
}
