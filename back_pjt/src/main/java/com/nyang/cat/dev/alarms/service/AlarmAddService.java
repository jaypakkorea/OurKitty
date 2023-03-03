package com.nyang.cat.dev.alarms.service;

import com.nyang.cat.dev.util.constants.AlarmType;

public interface AlarmAddService {

	void addAlarm(AlarmType alarmType, Long targetId, Long receiverId, String imageUrl, Long targetUserId, String ... values);
}
