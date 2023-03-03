package com.nyang.cat.dev.dishes.repository;

import com.nyang.cat.domain.Dish;
import com.nyang.cat.domain.DishFoodLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface DishFoodLogRepository extends JpaRepository<DishFoodLog, Long> {

    Optional<DishFoodLog> findTop1ByDishOrderByCreatedDateDesc(Dish dish);

    List<DishFoodLog> findDishFoodLogByDish_IdAndCreatedDateBetweenOrderByCreatedDateAsc(Long dishId, LocalDateTime startTime, LocalDateTime endTime);

    Optional<DishFoodLog> findTop1ByDish_IdAndCreatedDateBeforeOrderByCreatedDateDesc(Long dishId, LocalDateTime localDateTime);
}
