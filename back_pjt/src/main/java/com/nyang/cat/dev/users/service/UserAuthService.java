package com.nyang.cat.dev.users.service;

import com.nyang.cat.dev.users.dto.UserDto;

public interface UserAuthService {

	UserDto findUser(String token, Boolean isRequired);
}
