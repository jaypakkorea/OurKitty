package com.nyang.cat.dev.users.service;

import com.nyang.cat.dev.users.dto.UserDto;
import com.nyang.cat.dev.users.repository.UserRepository;
import com.nyang.cat.dev.util.S3Uploader;
import com.nyang.cat.domain.User;
import com.nyang.cat.exception.common.ObjectCrudException;
import com.nyang.cat.exception.constants.ErrorCode;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;

import java.io.IOException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserModifyServiceImpl implements UserModifyService {

	private final UserRepository userRepository;
	private final UserAuthService userAuthService;
	private final S3Uploader s3Uploader;

	/**
	 * 유저 프로필 이미지 수정 메서드
	 * @param token         유저 권한 확인 및 유저 정보를 가져오기 위한 엑세스 토큰
	 * @param profileImage  수정할 프로필 이미지 파일
	 */
	@Transactional
	@Override
	public void modifyProfileImage(String token, MultipartFile profileImage) throws IOException {

		// 권환 확인 및 유저 정보를 가져오기
		User user = check(token);

		// S3 서버에 이전의 프로필 이미지가 저장되어 있다면 삭제
		if (user.getProfileImageUrl() != null && user.getProfileImageUrl()
			.startsWith("https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/")) {
			s3Uploader.deleteFile(user.getProfileImageUrl());
		}

		// 새로운 프로필 이미지를 업로드 후 경로를 가져옴
		String profileImageUrl = s3Uploader.upload(profileImage);

		// Entity 의 프로필 이미지 경로 수정 후 저장
		user.changeProfileImage(profileImageUrl);
		userRepository.save(user);
	}

	/**
	 * 유저 닉네임 수정 메서드
	 * @param token     유저 권한 확인 및 유저 정보를 가져오기 위한 엑세스 토큰
	 * @param nickName  수정할 닉네임
	 */
	@Transactional
	@Override
	public void modifyNickName(String token, String nickName) {

		// 권환 확인 및 유저 정보를 가져오기
		User user = check(token);

		// Entity 의 닉네임 수정 후 저장
		user.changeNickName(nickName);
		userRepository.save(user);
	}

	/**
	 * 유저 위치정보 제공 여부 수정 메서드
	 * @param token     유저 권한 확인 및 유저 정보를 가져오기 위한 엑세스 토큰
	 */
	@Transactional
	@Override
	public void modifyLocationProvision(String token) {

		// 권환 확인 및 유저 정보를 가져오기
		User user = check(token);

		// Entity 의 닉네임 수정 후 저장
		user.changeAgreeLocationProvision();
		userRepository.save(user);
	}

	/**
	 * 유저 권한 확인 및 유저 정보를 가져오는 메서드
	 * @param token 유저 권환 확인 및 유저 정보를 가져오기 위한 엑세스 토큰
	 * @return 유저 Entity
	 */
	private User check(String token) {

		// 권환 확인 및 유저 정보를 가져오기
		UserDto userDto = userAuthService.findUser(token, true);
		Optional<User> userOptional = userRepository.findById(userDto.getId());

		// DB에 해당하는 유저 정보가 없는 경우
		if (userOptional.isEmpty()) {
			throw new ObjectCrudException(ErrorCode.NOT_FOUND_ENTITY, userDto);
		}

		return userOptional.get();
	}
}
