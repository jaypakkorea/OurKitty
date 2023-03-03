package com.nyang.cat.dev.alarms.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.nyang.cat.dev.admins.dto.AdminDto;
import com.nyang.cat.dev.admins.service.AdminAuthService;
import com.nyang.cat.dev.alarms.repository.AdminAlarmRepository;
import com.nyang.cat.dev.alarms.repository.UserAlarmRepository;
import com.nyang.cat.dev.users.dto.UserDto;
import com.nyang.cat.dev.users.service.UserAuthService;
import com.nyang.cat.domain.AdminAlarm;
import com.nyang.cat.domain.UserAlarm;
import com.nyang.cat.domain.global.AlarmBaseEntity;
import com.nyang.cat.exception.common.CustomException;
import com.nyang.cat.exception.constants.ErrorCode;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class AlarmHandleServiceImpl implements AlarmHandleService {

	private final UserAuthService userAuthService;
	private final AdminAuthService adminAuthService;
	private final UserAlarmRepository userAlarmRepository;
	private final AdminAlarmRepository adminAlarmRepository;

	@Override
	public void modifyUserAlarmState(String token, Long alarmId) {

		UserAlarm userAlarm = getUserAlarm(token, alarmId);

		userAlarm.check();
		userAlarmRepository.save(userAlarm);
	}

	@Override
	public void deleteUserAlarmState(String token, Long alarmId) {

		UserAlarm userAlarm = getUserAlarm(token, alarmId);

		userAlarm.delete();
		userAlarmRepository.save(userAlarm);
	}

	@Override
	public void modifyAdminAlarmState(String token, Long alarmId) {

		AdminAlarm adminAlarm = getAdminAlarm(token, alarmId);

		adminAlarm.check();
		adminAlarmRepository.save(adminAlarm);
	}

	@Override
	public void deleteAdminAlarmState(String token, Long alarmId) {

		AdminAlarm adminAlarm = getAdminAlarm(token, alarmId);

		adminAlarm.delete();
		adminAlarmRepository.save(adminAlarm);
	}

	private UserAlarm getUserAlarm(String token, Long alarmId) {
		UserDto userDto = userAuthService.findUser(token, true);

		Optional<UserAlarm> userAlarmOptional = userAlarmRepository.findById(alarmId);

		if(!userCheck(userDto.getId(), userAlarmOptional)) {
			throw new CustomException(ErrorCode.NO_AUTHORITY);
		}

		return userAlarmOptional.get();
	}

	private boolean adminCheck(Long adminId, Optional<AdminAlarm> adminAlarmOptional) {
		return adminAlarmOptional.isPresent() && adminId.equals(adminAlarmOptional.get().getAdmin().getId());
	}

	private AdminAlarm getAdminAlarm(String token, Long alarmId) {
		AdminDto adminDto = adminAuthService.findAdmin(token);

		Optional<AdminAlarm> adminAlarmOptional = adminAlarmRepository.findById(alarmId);

		if(!adminCheck(adminDto.getId(), adminAlarmOptional)) {
			throw new CustomException(ErrorCode.NO_AUTHORITY);
		}

		return adminAlarmOptional.get();
	}

	private boolean userCheck(Long userId, Optional<UserAlarm> userAlarmOptional) {
		return userAlarmOptional.isPresent() && userId.equals(userAlarmOptional.get().getUser().getId());
	}
}
