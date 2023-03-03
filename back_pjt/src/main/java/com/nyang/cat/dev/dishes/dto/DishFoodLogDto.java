package com.nyang.cat.dev.dishes.dto;

import com.nyang.cat.domain.DishFoodLog;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class DishFoodLogDto {

    private Long id;

    private Long serialNumber;

    private double food_weight;

    private LocalDateTime foodWeightChangeDate;


}
