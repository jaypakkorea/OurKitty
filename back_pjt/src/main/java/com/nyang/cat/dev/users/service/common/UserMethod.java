package com.nyang.cat.dev.users.service.common;

import javax.transaction.Transactional;

import org.springframework.stereotype.Component;

import com.nyang.cat.dev.users.dto.UserDto;
import com.nyang.cat.dev.users.repository.UserRepository;
import com.nyang.cat.dev.users.service.UserAuthService;
import com.nyang.cat.domain.User;
import com.nyang.cat.exception.common.CustomException;
import com.nyang.cat.exception.constants.ErrorCode;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@Transactional
@Slf4j
@RequiredArgsConstructor
public class UserMethod {

	private final UserRepository userRepository;
	private final UserAuthService userAuthService;

	/**
	 * 유저 조회
	 *
	 * @param token 유저 토큰
	 * @return 유저
	 */
	public User getTokenUser(String token, Boolean isRequired) {

		log.info("token : {}", token);

		UserDto userDto = userAuthService.findUser(token, isRequired);

		log.info("userDto : {}", userDto);

		if (userDto == null && !isRequired) {
			return null;
		} else if (userDto == null) {
			throw new CustomException(ErrorCode.NO_AUTHORITY);
		} else {
			return userRepository.findById(userDto.getId())
				.orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_ENTITY));
		}
	}

	public User getIdUser(Long id){
		return userRepository.findById(id).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_ENTITY));
	}
}
