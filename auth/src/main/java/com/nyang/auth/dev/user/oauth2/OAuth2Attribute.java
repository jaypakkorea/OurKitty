package com.nyang.auth.dev.user.oauth2;

import java.util.HashMap;
import java.util.Map;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@ToString
@Builder(access = AccessLevel.PRIVATE)
@Getter
class OAuth2Attribute {
	private String id;
	private String provider;
	private String picture;

	static OAuth2Attribute of(String provider, Map<String, Object> attributes) {

		switch (provider) {
			case "google":
				return ofGoogle(attributes);
			case "kakao":
				return ofKakao(attributes);
			case "naver":
				return ofNaver(attributes);
			default:
				throw new RuntimeException();
		}
	}

	private static OAuth2Attribute ofGoogle(Map<String, Object> attributes) {

		return OAuth2Attribute.builder()
			.id((String)attributes.get("sub"))
			.provider("google")
			.picture((String)attributes.get("picture"))
			.build();
	}

	private static OAuth2Attribute ofKakao(Map<String, Object> attributes) {

		Map<String, Object> kakaoAccount = (Map<String, Object>)attributes.get("kakao_account");
		Map<String, Object> kakaoProfile = (Map<String, Object>)kakaoAccount.get("profile");

		return OAuth2Attribute.builder()
			.id(attributes.get("id").toString())
			.provider("kakao")
			.picture((String)kakaoProfile.get("profile_image_url"))
			.build();
	}

	private static OAuth2Attribute ofNaver(Map<String, Object> attributes) {

		Map<String, Object> response = (Map<String, Object>)attributes.get("response");

		return OAuth2Attribute.builder()
			.id((String)response.get("id"))
			.provider("naver")
			.picture((String)response.get("profile_image"))
			.build();
	}

	Map<String, Object> convertToMap() {
		Map<String, Object> map = new HashMap<>();
		map.put("id", id);
		map.put("provider", provider);
		map.put("picture", picture);

		return map;
	}
}
