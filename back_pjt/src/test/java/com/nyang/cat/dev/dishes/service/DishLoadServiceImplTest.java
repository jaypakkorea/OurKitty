package com.nyang.cat.dev.dishes.service;

import static org.junit.jupiter.api.Assertions.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.nyang.cat.dev.dishes.dto.DishDto;


@SpringBootTest
class DishLoadServiceImplTest {

	@Autowired
	DishLoadServiceImpl dishLoadService;

	@Test
	void mapLoadTest() {
		Map<String, String> params = new HashMap<>();

		params.put("swLat", "0.0");
		params.put("swLng", "0.0");
		params.put("neLat", "9999.0");
		params.put("neLng", "9999.0");

		List<DishDto> dishes = dishLoadService.findDishes(params);

		assertNotEquals(dishes.size(), 0);
	}

	@Test
	void detailLoadTest() {

		DishDto dishDto = dishLoadService.findDish(1L);

		assertNotNull(dishDto);
	}
}