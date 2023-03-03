package com.nyang.cat.dev.alarms.service;

public interface AlarmHandleService {

	void modifyAdminAlarmState(String token, Long alarmId);
	void deleteAdminAlarmState(String token, Long alarmId);
	void modifyUserAlarmState(String token, Long alarmId);
	void deleteUserAlarmState(String token, Long alarmId);
}
