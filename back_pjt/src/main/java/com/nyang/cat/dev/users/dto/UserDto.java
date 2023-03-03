package com.nyang.cat.dev.users.dto;

import com.nyang.cat.domain.User;

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
public class UserDto {

	private Long id;
	private String profileImg;
	private String nickName;
	private Boolean isAgreeLocationProvision;

	public User toEntity(){
		User user = User.builder()
			.id(this.id)
			.profileImageUrl(this.profileImg)
			.nickName(this.nickName)
			.isAgreeLocationProvision(this.isAgreeLocationProvision)
			.build();
		return user;
	}
}
