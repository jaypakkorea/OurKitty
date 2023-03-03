package com.nyang.auth.dev.admin.service;

import com.nyang.auth.dev.admin.dto.AdminDto;
import com.nyang.auth.domain.Admin;

public interface AdminService {

	void addAdmin(AdminDto adminDto);

	AdminDto findAdmin(String token);
}
