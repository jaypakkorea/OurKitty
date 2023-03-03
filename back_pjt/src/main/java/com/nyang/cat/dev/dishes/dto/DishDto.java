package com.nyang.cat.dev.dishes.dto;

import com.nyang.cat.domain.AdminGroup;
import com.nyang.cat.domain.Dish;
import com.nyang.cat.domain.DishFoodLog;
import com.nyang.cat.domain.DishLike;
import com.nyang.cat.domain.IoTCatImg;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class DishDto {

    private Long id;

    private String serialNumber;

    private AdminGroup adminGroup;

    private String dishName;
    private String otherNote;

    private Double lat;
    private Double lon;

    private double food_weight;
    private String foodWeightChangeDate;

    private String loadAddress;
    private String dishImg;
    private int dishState;
}
