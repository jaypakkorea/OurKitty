package com.nyang.cat.dev.dishes.service;

import java.util.List;

import com.nyang.cat.dev.dishes.dto.DishDto;
import com.nyang.cat.dev.dishes.dto.DishLikeResultDto;

public interface DishLikeService {
    DishLikeResultDto addDishLike(Long id, String token);

    List<DishDto> findLikeDishes(String token);
}
