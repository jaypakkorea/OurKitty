package com.nyang.cat.dev.dishes.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.nyang.cat.dev.admins.dto.AdminDto;
import com.nyang.cat.dev.admins.service.AdminAuthService;
import com.nyang.cat.dev.dishes.dto.DishDto;
import com.nyang.cat.dev.dishes.repository.DishFoodLogRepository;
import com.nyang.cat.dev.dishes.repository.DishRepository;
import com.nyang.cat.dev.util.constants.IotConstants;
import com.nyang.cat.dev.util.converter.DishConverter;
import com.nyang.cat.domain.Dish;
import com.nyang.cat.domain.DishFoodLog;
import com.nyang.cat.exception.common.CustomException;
import com.nyang.cat.exception.constants.ErrorCode;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class DishLoadServiceImpl implements DishLoadService {

	private final AdminAuthService adminAuthService;
	private final DishRepository dishRepository;
	private final DishFoodLogRepository dishFoodLogRepository;

	@Transactional
	@Override
	public List<DishDto> findDishes(Map<String, String> params) {

		Double swLat = Double.parseDouble(params.get("swLat"));
		Double swLon = Double.parseDouble(params.get("swLng"));
		Double neLat = Double.parseDouble(params.get("neLat"));
		Double neLon = Double.parseDouble(params.get("neLng"));

		List<Dish> dishList = dishRepository.findDishByLatBetweenAndLonBetweenAndDishStateEquals(swLat, neLat,
			swLon, neLon, 1);

		List<DishDto> dishDtoList = new ArrayList<>();
		for (Dish dish : dishList) {
			dishDtoList.add(getDishDto(dish));
		}

		return dishDtoList;
	}

	@Transactional
	@Override
	public DishDto findDish(Long dishId) {

		Optional<Dish> dishOptional = dishRepository.findById(dishId);

		if (dishOptional.isEmpty() || dishOptional.get().getDishState() == 2) {
			throw new CustomException(ErrorCode.NOT_FOUND_ENTITY);
		}

		return getDishDto(dishOptional.get());
	}

	@Transactional
	@Override
	public List<DishDto> findAdminDishes(String token) {

		AdminDto adminDto = adminAuthService.findAdmin(token);
		List<Dish> dishList = dishRepository.findDishByAdminGroup_IdAndDishStateLessThan(adminDto.getGroupId(), 2);

		List<DishDto> dishDtoList = new ArrayList<>();
		for (Dish dish : dishList) {
			dishDtoList.add(getDishDto(dish));
		}

		return dishDtoList;
	}

	private DishDto getDishDto(Dish dish) {

		DishFoodLog dishFoodLog = dishFoodLogRepository.findTop1ByDishOrderByCreatedDateDesc(dish).orElse(null);

		double weight = dishFoodLog != null ? ((dishFoodLog.getFoodWeight() / IotConstants.MAX_WEIGHT) * 100) : 0.0;
		String foodWeightChangeDate = dishFoodLog != null ? dishFoodLog.getCreatedDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")) : "";

		DishDto dishDto = DishConverter.dishConvertToDishInfoDto(dish);
		dishDto.setFood_weight(weight);
		dishDto.setFoodWeightChangeDate(foodWeightChangeDate);

		return dishDto;
	}
}
