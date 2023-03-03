package com.nyang.cat.dev.alarms.service;

import java.util.List;

import com.nyang.cat.dev.alarms.dto.AlarmDto;

public interface AlarmLoadService {

	List<AlarmDto> findUserAlarms(String token);
	List<AlarmDto> findAdminAlarms(String token);
}
