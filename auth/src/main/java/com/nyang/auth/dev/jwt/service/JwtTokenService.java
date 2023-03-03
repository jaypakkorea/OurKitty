package com.nyang.auth.dev.jwt.service;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.nyang.auth.dev.jwt.dto.JwtToken;
import com.nyang.auth.dev.jwt.repository.RefreshTokenRepository;
import com.nyang.auth.exception.common.CustomException;
import com.nyang.auth.exception.constants.ErrorCode;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class JwtTokenService {

	private final RefreshTokenRepository refreshTokenRepository;
	private final JwtTokenProviderService jwtTokenProviderService;

	public String refreshToken(String refresh) {
		try {

			Boolean isExistedRefresh = refreshTokenRepository.existsByRefreshToken(refresh);

			if (refresh != null && jwtTokenProviderService.verifyToken(refresh) && isExistedRefresh) {

				String id = jwtTokenProviderService.getUid(refresh);
				String provider = jwtTokenProviderService.getValue(refresh, "provider");
				System.out.println(provider);
				String role = jwtTokenProviderService.getValue(refresh, "role");

				JwtToken newToken = jwtTokenProviderService.generateToken(id, provider, role);

				return newToken.getToken();
			} else {
				throw new CustomException(ErrorCode.REFRESH_EXPIRED);
			}
		} catch (Exception e) {
			e.printStackTrace();
			throw new CustomException(ErrorCode.REFRESH_EXPIRED);
		}
	}
}
