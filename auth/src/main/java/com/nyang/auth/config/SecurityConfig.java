package com.nyang.auth.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.nyang.auth.dev.admin.security.AdminAuthenticationFilter;
import com.nyang.auth.dev.jwt.filter.JwtAuthFilter;
import com.nyang.auth.dev.jwt.repository.RefreshTokenRepository;
import com.nyang.auth.dev.jwt.service.JwtTokenProviderService;
import com.nyang.auth.dev.user.oauth2.OAuth2SuccessHandler;
import com.nyang.auth.dev.user.oauth2.OAuth2UserService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	private final OAuth2UserService oAuth2UserService;
	private final OAuth2SuccessHandler successHandler;
	private final JwtTokenProviderService jwtTokenProviderService;
	private final RefreshTokenRepository refreshTokenRepository;
	private final CorsConfig corsConfig;

	@Override
	protected void configure(HttpSecurity http) throws Exception {

		AuthenticationManager authenticationManager = http.getSharedObject(AuthenticationManager.class);

		http.httpBasic().disable()
				.csrf().disable()
				.formLogin().disable()
				.apply(new AdminConfig(jwtTokenProviderService, refreshTokenRepository, corsConfig))
			.and()
				.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
			.and()
				.authorizeRequests()
				.antMatchers("/users/**").hasAuthority("USER")
				.antMatchers("/admins/authentication/**").hasAuthority("ADMIN")
				.anyRequest().permitAll()
			.and()
				.oauth2Login().loginPage("/token/expired")
					.successHandler(successHandler)
					.userInfoEndpoint().userService(oAuth2UserService);

		http.addFilterBefore(new JwtAuthFilter(jwtTokenProviderService), AdminAuthenticationFilter.class);
	}

	//passwordEncoder
	@Bean
	public BCryptPasswordEncoder encodePassword() {
		return new BCryptPasswordEncoder();
	}
}
