package com.nyang.auth.dev.admin.dto;

import com.nyang.auth.domain.Admin;
import com.nyang.auth.domain.AdminGroup;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdminDto {

	private long id;

	private String adminEmail;

	private String groupName;

	private Long groupId;

	private String adminPassword;

	private String adminName;

	private String adminPhone;

	private String adminRole;

	private Integer adminState;

	public Admin toEntity(String password, AdminGroup adminGroup) {
		return Admin.builder()
			.adminEmail(this.adminEmail)
			.adminPassword(password)
			.group(adminGroup)
			.adminName(this.adminName)
			.adminPhone(this.adminPhone)
			.adminRole(this.adminRole)
			.adminState(-1)
			.build();
	}
}
