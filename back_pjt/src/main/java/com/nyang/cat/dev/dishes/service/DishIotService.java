package com.nyang.cat.dev.dishes.service;

import com.nyang.cat.domain.Dish;

public interface DishIotService {
    String locationAdd(String serialNumber, Double lat, Double lon);
    String weightAdd(String serialNumber, Double foodWeight);
}
