package com.nyang.cat.dev.admins.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.nyang.cat.dev.admins.dto.AdminDto;
import com.nyang.cat.exception.common.CustomException;
import com.nyang.cat.exception.constants.ErrorCode;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;

@Service
@Slf4j
@RequiredArgsConstructor
public class AdminAuthServiceImpl implements AdminAuthService {

	@Value("${auth.base-url}")
	private String BASE_URL;

	@Override
	public AdminDto findAdmin(String token) {
		WebClient webClient = WebClient.builder().baseUrl(BASE_URL).build();

		log.debug("token:: {}", token);
		Mono<AdminDto> response = webClient.get()
			.uri("/admins/authentication")
			.header("Authorization", token)
			.retrieve()
			.onStatus(HttpStatus::is4xxClientError, clientResponse -> {
				log.error("인증 서버 에러");
				throw new CustomException(ErrorCode.NO_AUTHORITY);
			})
			.onStatus(HttpStatus::is5xxServerError, clientResponse -> {
				log.error("인증 서버 에러");
				throw new CustomException(ErrorCode.NO_AUTHORITY);
			})
			.bodyToMono(AdminDto.class);

		log.info("response:: {}", response.block());

		return response.block();
	}
}
