package com.nyang.cat.dev.dishes.service;

import com.nyang.cat.dev.dishes.dto.DishDto;

import java.util.List;
import java.util.Map;

public interface DishLoadService {

    List<DishDto> findDishes(Map<String, String> params);
    public DishDto findDish(Long dishId);
    List<DishDto> findAdminDishes(String token);

}
