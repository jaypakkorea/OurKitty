package com.nyang.cat.dev.users.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.nyang.cat.dev.users.dto.UserDto;
import com.nyang.cat.exception.common.CustomException;
import com.nyang.cat.exception.constants.ErrorCode;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserAuthServiceImpl implements UserAuthService {

	@Value("${auth.base-url}")
	private String BASE_URL;

	/**
	 * 인증서버로 엑세스 토큰을 보내서 권한을 인증받고 로그인한 유저의 정보를 가져오는 메서드
	 * @param token			권한 확인 및 유저 정보를 받아오기 위한 엑세스 토큰
	 * @param isRequired	권한 확인의 필수 여부
	 * @return				로그인한 유저의 DTO
	 */
	@Transactional
	@Override
	public UserDto findUser(String token, Boolean isRequired) {

		WebClient webClient = WebClient.builder().baseUrl(BASE_URL).build();

		Mono<UserDto> response = webClient.get()
			.uri("/users")
			.header("Authorization", token)
			.retrieve()
			.onStatus(HttpStatus::is4xxClientError, clientResponse -> {
				if(isRequired) {
					log.error("권한 에러");
					throw new CustomException(ErrorCode.NO_AUTHORITY);
				} else {
					return null;
				}
			})
			.onStatus(HttpStatus::is5xxServerError, clientResponse -> {
				if(isRequired) {
					log.error("인증 서버 에러");
					throw new CustomException(ErrorCode.NO_AUTHORITY);
				} else {
					return null;
				}
			})
			.bodyToMono(UserDto.class);

		return response.block();
	}
}
