package com.nyang.cat.dev.admins.service.common;

import javax.transaction.Transactional;

import org.springframework.stereotype.Component;

import com.nyang.cat.dev.admins.dto.AdminDto;
import com.nyang.cat.dev.admins.repository.AdminRepository;
import com.nyang.cat.dev.admins.service.AdminAuthService;
import com.nyang.cat.dev.admins.service.AdminService;
import com.nyang.cat.dev.users.dto.UserDto;
import com.nyang.cat.domain.Admin;
import com.nyang.cat.domain.User;
import com.nyang.cat.exception.common.CustomException;
import com.nyang.cat.exception.constants.ErrorCode;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@Transactional
@Slf4j
@RequiredArgsConstructor
public class AdminMethod {

	private final AdminAuthService adminAuthService;
	private final AdminRepository adminRepository;


	/**
	 * 관리자 조회
	 *
	 * @param token 관리자 토큰
	 * @return 관리자
	 */
	public Admin getTokenAdmin(String token) {
		log.info("token : {}", token);
		AdminDto admin = adminAuthService.findAdmin(token);
		return adminRepository.findById(admin.getId()).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_ENTITY));
	}
}
