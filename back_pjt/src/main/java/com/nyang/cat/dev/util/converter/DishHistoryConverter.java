package com.nyang.cat.dev.util.converter;

import java.time.format.DateTimeFormatter;

import com.nyang.cat.dev.dishes.dto.DishAlarmHistoryDto;
import com.nyang.cat.dev.dishes.dto.DishHistoryDto;
import com.nyang.cat.domain.AlarmHistory;
import com.nyang.cat.domain.DishHistory;

public class DishHistoryConverter {

	public static DishAlarmHistoryDto alarmHistoryConvertToDishAlarmHistoryDto(AlarmHistory alarmHistory) {

		return DishAlarmHistoryDto.builder()
			.id(alarmHistory.getId())
			.dishId(alarmHistory.getTargetId())
			.content(alarmHistory.getContent())
			.createdDate(alarmHistory.getCreatedDate())
			.build();
	}

	public static DishHistoryDto dishHistoryConvertToDto(DishHistory dishHistory) {

		return DishHistoryDto.builder()
			.id(dishHistory.getId())
			.dishId(dishHistory.getDish().getId())
			.adminId(dishHistory.getAdmin().getId())
			.adminName(dishHistory.getAdmin().getAdminName())
			.state(dishHistory.getState())
			.content(dishHistory.getContent())
			.createdDate(dishHistory.getCreatedDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")))
			.build();
	}
}
