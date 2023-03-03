package com.nyang.cat.dev.dishes.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.nyang.cat.dev.dishes.dto.DishAlarmHistoryDto;
import com.nyang.cat.dev.dishes.dto.DishHistoryDto;

public interface DishHistoryService {

	List<DishAlarmHistoryDto> findDishAlarmHistories(String token, Long dishId);
	List<DishHistoryDto> findDishHistories(String token, Long dishId);
	DishHistoryDto addDishHistory(String token, DishHistoryDto dishHistoryDto);
}
