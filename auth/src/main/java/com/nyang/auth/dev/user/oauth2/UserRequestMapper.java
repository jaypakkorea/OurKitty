package com.nyang.auth.dev.user.oauth2;

import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Component;

import com.nyang.auth.dev.jwt.dto.AuthDto;

@Component
public class UserRequestMapper {
	public AuthDto toDto(OAuth2User oAuth2User) {
		var attributes = oAuth2User.getAttributes();
		return AuthDto.builder()
			.id((String)attributes.get("id"))
			.provider((String)attributes.get("provider"))
			.picture((String)attributes.get("picture"))
			.build();
	}
}
