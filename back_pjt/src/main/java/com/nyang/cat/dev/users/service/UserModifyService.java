package com.nyang.cat.dev.users.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface UserModifyService {

    void modifyProfileImage(String token, MultipartFile profileImage) throws IOException;
    void modifyNickName(String token, String nickName);
	void modifyLocationProvision(String token);
}
