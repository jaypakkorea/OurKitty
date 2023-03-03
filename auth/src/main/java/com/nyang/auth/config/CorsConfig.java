package com.nyang.auth.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsConfig {

	@Bean
	public CorsFilter corsFilter() {

		CorsConfiguration config = new CorsConfiguration();

		config.setAllowCredentials(true); //내서버가 응답을 할때 json 을 자바스크립트에서 처리할 수 있게 할지
		config.addAllowedOriginPattern("*"); //모든 아이피를 응답허용
		config.addAllowedHeader("*"); //모든 header 응답허용
		config.addAllowedMethod("*"); //모든 post,get,put 허용

		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", config);

		return new CorsFilter(source);
	}
}