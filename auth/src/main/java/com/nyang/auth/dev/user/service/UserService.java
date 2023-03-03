package com.nyang.auth.dev.user.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.nyang.auth.dev.jwt.service.JwtTokenProviderService;
import com.nyang.auth.dev.user.dto.UserDto;
import com.nyang.auth.dev.user.repository.UserRepository;
import com.nyang.auth.domain.User;
import com.nyang.auth.exception.common.CustomException;
import com.nyang.auth.exception.constants.ErrorCode;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

	private final JwtTokenProviderService jwtTokenProviderService;
	private final UserRepository userRepository;

	public UserDto findUser(String token) {

		User user = findUserByToken(token);

		return UserDto.builder()
			.id(user.getId())
			.profileImg(user.getProfileImageUrl())
			.nickName(user.getNickName())
			.isAgree(user.getIsAgreeLocationProvision())
			.build();
	}

	private User findUserByToken(String token) {

		if (token != null && jwtTokenProviderService.verifyToken(token)) {

			String accountId = jwtTokenProviderService.getUid(token);
			String provider = jwtTokenProviderService.getValue(token, "provider");

			Optional<User> userOptional = userRepository.findUserByAccountIdAndProvider(accountId, provider);

			if (userOptional.isEmpty()) {
				throw new CustomException(ErrorCode.NOT_FOUND_DTO);
			}

			return userOptional.get();

		} else {
			// access 토큰 만료 에러 throw
			throw new CustomException(ErrorCode.TOKEN_EXPIRED);
		}
	}
}
