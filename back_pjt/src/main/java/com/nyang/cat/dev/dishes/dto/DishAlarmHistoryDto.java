package com.nyang.cat.dev.dishes.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DishAlarmHistoryDto {

	Long id;
	Long dishId;
	String content;
	LocalDateTime createdDate;

}
