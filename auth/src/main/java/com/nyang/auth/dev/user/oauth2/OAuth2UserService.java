package com.nyang.auth.dev.user.oauth2;

import java.util.Collections;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class OAuth2UserService
	implements org.springframework.security.oauth2.client.userinfo.OAuth2UserService<OAuth2UserRequest, OAuth2User> {

	@Override
	public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
		org.springframework.security.oauth2.client.userinfo.OAuth2UserService<OAuth2UserRequest, OAuth2User> oAuth2UserService = new DefaultOAuth2UserService();
		OAuth2User oAuth2User = oAuth2UserService.loadUser(userRequest);

		String registrationId = userRequest.getClientRegistration().getRegistrationId();

		OAuth2Attribute oAuth2Attribute =
			OAuth2Attribute.of(registrationId, oAuth2User.getAttributes());

		log.info("{}", oAuth2Attribute);

		var memberAttribute = oAuth2Attribute.convertToMap();

		return new DefaultOAuth2User(
			Collections.singleton(new SimpleGrantedAuthority("USER")),
			memberAttribute, "id");
	}
}


