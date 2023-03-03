package com.nyang.cat.dev.alarms.dto;

import com.nyang.cat.domain.AdminAlarm;
import com.nyang.cat.domain.UserAlarm;
import com.nyang.cat.domain.global.AlarmBaseEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AlarmDto {

	private Long id;
	private String content;
	private String imgUrl;
	private String targetUrl;
	private String targetUserUrl;
	private Integer state;
	private Integer alarmType;

	public static AlarmDto convertToDto(AlarmBaseEntity alarmBaseEntity) {

		Long id = null;
		String targetUserUrl = null;

		if (alarmBaseEntity instanceof UserAlarm) {
			id = ((UserAlarm)alarmBaseEntity).getId();
			targetUserUrl = ((UserAlarm)alarmBaseEntity).getTargetUserUrl();
		} else if (alarmBaseEntity instanceof AdminAlarm) {
			id = ((AdminAlarm)alarmBaseEntity).getId();
		}

		return AlarmDto.builder()
			.id(id)
			.content(alarmBaseEntity.getContent())
			.imgUrl(alarmBaseEntity.getImgUrl())
			.targetUrl(alarmBaseEntity.getTargetUrl())
			.targetUserUrl(targetUserUrl)
			.state(alarmBaseEntity.getState())
			.alarmType(alarmBaseEntity.getAlarmCode())
			.build();
	}
}
