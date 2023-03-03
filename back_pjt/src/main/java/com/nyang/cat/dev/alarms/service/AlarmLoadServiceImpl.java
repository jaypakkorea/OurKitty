package com.nyang.cat.dev.alarms.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.nyang.cat.dev.admins.dto.AdminDto;
import com.nyang.cat.dev.admins.service.AdminAuthService;
import com.nyang.cat.dev.alarms.dto.AlarmDto;
import com.nyang.cat.dev.alarms.repository.AdminAlarmRepository;
import com.nyang.cat.dev.alarms.repository.UserAlarmRepository;
import com.nyang.cat.dev.users.dto.UserDto;
import com.nyang.cat.dev.users.service.UserAuthService;
import com.nyang.cat.domain.AdminAlarm;
import com.nyang.cat.domain.UserAlarm;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class AlarmLoadServiceImpl implements AlarmLoadService {

	private final UserAuthService userAuthService;
	private final AdminAuthService adminAuthService;
	private final UserAlarmRepository userAlarmRepository;
	private final AdminAlarmRepository adminAlarmRepository;

	/**
	 * 로그인한 유저에 해당하는 모든 알람을 불러오는 메서드
	 * @param token        권한 확인 및 유저 정보를 불러오기 위한 엑세스 토큰
	 * @return 해당하는 알람 리스트
	 */
	@Override
	public List<AlarmDto> findUserAlarms(String token) {

		// 권한 인증 및 사용자 정보 불러오기
		UserDto userDto = userAuthService.findUser(token, true);

		// 해당 유저의 알람들을 리스트로 가져와서 DTO 로 변환 후 반환
		List<AlarmDto> list = new ArrayList<>();
		for (UserAlarm userAlarm : userAlarmRepository.findByUser_IdOrderByCreatedDateDesc(userDto.getId())) {
			if (userAlarm.getState() != 2) {
				list.add(AlarmDto.convertToDto(userAlarm));
			}
		}

		return list;
	}

	/**
	 * 로그인한 관리자에 해당하는 모든 알람을 불러오는 메서드
	 * @param token        권한 확인 및 관리자 정보를 불러오기 위한 엑세스 토큰
	 * @return 해당하는 알람 리스트
	 */
	@Override
	public List<AlarmDto> findAdminAlarms(String token) {
		// 권한 인증 및 사용자 정보 불러오기
		AdminDto adminDto = adminAuthService.findAdmin(token);

		// 해당 유저의 알람들을 리스트로 가져와서 DTO 로 변환 후 반환
		List<AlarmDto> list = new ArrayList<>();
		for (AdminAlarm adminAlarm : adminAlarmRepository.findByAdmin_IdOrderByCreatedDateDesc(adminDto.getId())) {
			if (adminAlarm.getState() != 2) {
				list.add(AlarmDto.convertToDto(adminAlarm));
			}
		}

		return list;
	}
}
