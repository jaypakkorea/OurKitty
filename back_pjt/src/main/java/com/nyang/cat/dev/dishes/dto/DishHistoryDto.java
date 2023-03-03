package com.nyang.cat.dev.dishes.dto;

import java.time.LocalDateTime;

import com.nyang.cat.domain.Admin;
import com.nyang.cat.domain.Dish;
import com.nyang.cat.domain.DishHistory;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class DishHistoryDto {

	private Long id;
	private Long dishId;
	private Long adminId;
	private String adminName;
	private Integer state;
	private String content;
	private String createdDate;

	public DishHistory toEntity(Dish dish, Admin admin) {
		return DishHistory.builder().dish(dish).admin(admin).content(this.content).state(this.state).build();
	}
}
