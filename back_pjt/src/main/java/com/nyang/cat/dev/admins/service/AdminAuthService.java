package com.nyang.cat.dev.admins.service;

import com.nyang.cat.dev.admins.dto.AdminDto;

public interface AdminAuthService {

	AdminDto findAdmin(String token);
}
