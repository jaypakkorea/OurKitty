package com.nyang.cat.dev.dishes.service;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

import com.nyang.cat.dev.dishes.dto.DishAddDto;
import com.nyang.cat.dev.dishes.dto.DishDto;
import com.nyang.cat.dev.dishes.dto.LocationDto;

public interface DishAddModDelService {
    DishDto addDish(DishAddDto dishDto, String token);

    DishDto modifyDish(DishAddDto dishDto, String token, MultipartFile image) throws IOException;

    Long deleteDish(Long id, String token);

    LocationDto findDishLocation(Long id, String token);

    DishDto addDishLocation(LocationDto locationDto, String token) throws IOException;
}
