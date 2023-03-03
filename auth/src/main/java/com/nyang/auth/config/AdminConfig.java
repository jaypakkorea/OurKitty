package com.nyang.auth.config;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;

import com.nyang.auth.dev.admin.security.AdminAuthenticationFilter;
import com.nyang.auth.dev.jwt.repository.RefreshTokenRepository;
import com.nyang.auth.dev.jwt.service.JwtTokenProviderService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class AdminConfig extends AbstractHttpConfigurer<AdminConfig, HttpSecurity> {

	private final JwtTokenProviderService jwtTokenProviderService;
	private final RefreshTokenRepository refreshTokenRepository;
	private final CorsConfig corsConfig;

	@Override
	public void configure(HttpSecurity http) {
		AuthenticationManager authenticationManager = http.getSharedObject(AuthenticationManager.class);

		http
			.addFilter(corsConfig.corsFilter())
			.addFilter(new AdminAuthenticationFilter(authenticationManager,
				jwtTokenProviderService, refreshTokenRepository)); //AuthenticationManger가 있어야 된다.(파라미터로)

	}
}
