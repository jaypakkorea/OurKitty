package com.nyang.cat.dev.admins.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class DishVisitDto {

	private LocalDate localDate;
	private int startTime;

	private int endTime;

	private int value;

	public void plusValue(){
		value += 1;
	}
}
