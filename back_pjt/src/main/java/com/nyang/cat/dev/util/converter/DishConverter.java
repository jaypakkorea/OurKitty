package com.nyang.cat.dev.util.converter;

import java.time.format.DateTimeFormatter;

import com.nyang.cat.dev.dishes.dto.DishDto;
import com.nyang.cat.domain.Dish;
import com.nyang.cat.domain.DishFoodLog;

public class DishConverter {

	public static DishDto dishConvertToDishInfoDto(Dish dish) {
		return DishDto.builder()
			.id(dish.getId())
			.serialNumber(dish.getSerialNumber())
			.adminGroup(dish.getAdminGroup())
			.dishName(dish.getDishName())
			.otherNote(dish.getOtherNote())
			.loadAddress(dish.getLoadAddress())
			.dishImg(dish.getDishImg())
			.dishState(dish.getDishState())
			.lat(dish.getLat())
			.lon(dish.getLon())
			.build();
	}

	public static DishDto DishDto(Dish dish, DishFoodLog dishFoodLog){

		String s = "";

		return DishDto.builder()
			.id(dish.getId())
			.serialNumber(dish.getSerialNumber())
			.adminGroup(dish.getAdminGroup())
			.dishName(dish.getDishName())
			.otherNote(dish.getOtherNote())
			.loadAddress(dish.getLoadAddress())
			.dishImg(dish.getDishImg())
			.dishState(dish.getDishState())
			.lat(dish.getLat())
			.lon(dish.getLon())
			.food_weight(dishFoodLog.getFoodWeight())
			.foodWeightChangeDate(s)
			.build();
	}
}
