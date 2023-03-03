package com.nyang.auth.dev.admin.service;

import java.util.Optional;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.nyang.auth.dev.admin.dto.AdminDto;
import com.nyang.auth.dev.admin.repository.AdminGroupRepository;
import com.nyang.auth.dev.admin.repository.AdminRepository;
import com.nyang.auth.dev.jwt.service.JwtTokenProviderService;
import com.nyang.auth.domain.Admin;
import com.nyang.auth.domain.AdminGroup;
import com.nyang.auth.exception.common.CustomException;
import com.nyang.auth.exception.constants.ErrorCode;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

	private final AdminRepository adminRepository;
	private final AdminGroupRepository adminGroupRepository;
	private final BCryptPasswordEncoder passwordEncoder;
	private final JwtTokenProviderService jwtTokenProviderService;

	@Override
	public void addAdmin(AdminDto adminDto) {

		AdminGroup adminGroup = findAdminGroup(adminDto.getGroupName());

		adminRepository.save(adminDto.toEntity(passwordEncoder.encode(adminDto.getAdminPassword()), adminGroup));

	}

	@Override
	public AdminDto findAdmin(String token) {
		if (token != null && jwtTokenProviderService.verifyToken(token)) {

			String email = jwtTokenProviderService.getUid(token);

			Optional<Admin> adminOptional = adminRepository.findAdminByAdminEmail(email);

			if (adminOptional.isEmpty()) {
				// admin 없음 에러 throw
				throw new CustomException(ErrorCode.NOT_FOUND_DTO);
			}

			Admin admin = adminOptional.get();

			return adminConvertToDto(admin);

		} else {
			// refresh 토큰 만료 에러 throw
			throw new CustomException(ErrorCode.REFRESH_EXPIRED);
		}
	}

	private AdminDto adminConvertToDto(Admin admin) {
		return AdminDto.builder()
			.id(admin.getId())
			.groupId(admin.getGroup().getId())
			.groupName(admin.getGroup().getGroupName())
			.adminEmail(admin.getAdminEmail())
			.adminName(admin.getAdminName())
			.adminPhone(admin.getAdminPhone())
			.adminRole(admin.getAdminRole())
			.adminState(admin.getAdminState())
			.build();
	}

	private AdminGroup findAdminGroup(String groupName) {

		Optional<AdminGroup> adminGroupOptional = adminGroupRepository.findAdminGroupByGroupName(groupName);

		AdminGroup adminGroup;
		if(adminGroupOptional.isEmpty()) {
			adminGroup = AdminGroup.builder().groupName(groupName).build();

			adminGroupRepository.save(adminGroup);
		} else {
			adminGroup = adminGroupOptional.get();
		}

		return adminGroup;
	}
}
