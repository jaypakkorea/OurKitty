package com.nyang.cat.dev.dishes.dto;

import com.nyang.cat.domain.Dish;
import com.nyang.cat.domain.DishGpsLog;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class DishGpsLogDto {
    private Long id;

    private Long serialNumber;

    private double lat;

    private double lon;

    private LocalDateTime GpsChangeDate;

//    public DishGpsLog toEntity(){
//        return DishGpsLog.builder()
//                .id(id)
//                .dish(dish)
//                .lat(lat)
//                .lon(lon)
//                .GpsChangeDate(GpsChangeDate)
//                .build();
//
//    }
}
