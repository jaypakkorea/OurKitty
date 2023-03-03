package com.nyang.auth.dev.admin.security;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nyang.auth.dev.admin.repository.AdminRepository;
import com.nyang.auth.dev.jwt.dto.JwtToken;
import com.nyang.auth.dev.jwt.repository.RefreshTokenRepository;
import com.nyang.auth.dev.jwt.service.JwtTokenProviderService;
import com.nyang.auth.domain.Admin;
import com.nyang.auth.domain.RefreshToken;
import com.nyang.auth.domain.User;
import com.nyang.auth.exception.common.CustomException;
import com.nyang.auth.exception.constants.ErrorCode;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequiredArgsConstructor
@Slf4j
public class AdminAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

	private final AuthenticationManager authenticationManager;
	private final JwtTokenProviderService jwtTokenProviderService;
	private final RefreshTokenRepository refreshTokenRepository;

	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws
		AuthenticationException {

		ObjectMapper om = new ObjectMapper();
		Admin admin = null;

		try {
			admin = om.readValue(request.getInputStream(), Admin.class);
		} catch (IOException e) {
			e.printStackTrace();
			throw new CustomException(ErrorCode.NO_AUTHORITY);
		}

		log.info("{}", admin);

		UsernamePasswordAuthenticationToken authenticationToken =
			new UsernamePasswordAuthenticationToken(admin.getAdminEmail(), admin.getAdminPassword());

		Authentication authentication = authenticationManager.authenticate(authenticationToken);

		return authentication;
	}

	@Override
	protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
		Authentication authResult) throws IOException {

		AdminDetails adminDetails = (AdminDetails)authResult.getPrincipal();

		//token 생성
		JwtToken jwtToken = jwtTokenProviderService.generateToken(adminDetails.getUsername(), null, "admin");

		saveRefresh(jwtToken.getRefreshToken(), adminDetails.getAdmin());

		log.info("{}", jwtToken);

		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, String> jsonResponse = new HashMap<>();
		jsonResponse.put("token", jwtToken.getToken());
		jsonResponse.put("refresh", jwtToken.getRefreshToken());
		String result = objectMapper.writeValueAsString(jsonResponse);

		//response 응답
		response.setContentType("application/json");
		response.setCharacterEncoding("utf-8");
		response.getWriter().write(result);
	}

	private void saveRefresh(String refresh, Admin admin) {

		Optional<RefreshToken> refreshTokenOptional = refreshTokenRepository.findByAdmin_Id(admin.getId());

		RefreshToken refreshToken;

		if(refreshTokenOptional.isEmpty()) {
			refreshToken = RefreshToken.builder().admin(admin).refreshToken(refresh).build();
		} else {
			refreshToken = refreshTokenOptional.get();
		}

		refreshToken.updateRefreshToken(refresh);

		refreshTokenRepository.save(refreshToken);
	}
}
