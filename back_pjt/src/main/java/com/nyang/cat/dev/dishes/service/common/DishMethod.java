package com.nyang.cat.dev.dishes.service.common;

import javax.transaction.Transactional;

import org.springframework.stereotype.Component;

import com.nyang.cat.dev.dishes.repository.DishFoodLogRepository;
import com.nyang.cat.dev.dishes.repository.DishRepository;
import com.nyang.cat.domain.Dish;
import com.nyang.cat.domain.DishFoodLog;
import com.nyang.cat.exception.common.CustomException;
import com.nyang.cat.exception.constants.ErrorCode;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@Transactional
@Slf4j
@RequiredArgsConstructor
public class DishMethod {

	private final DishFoodLogRepository dishFoodLogRepository;
	private final DishRepository dishRepository;

	public Dish getDish(Long id) {
		return dishRepository.findById(id).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_ENTITY));
	}

	public DishFoodLog getDishFoodLog(Dish dish) {
		return dishFoodLogRepository.findTop1ByDishOrderByCreatedDateDesc(dish).orElse(DishFoodLog.builder()
			.dish(dish)
			.foodWeight(0.0)
			.build());
	}
}
