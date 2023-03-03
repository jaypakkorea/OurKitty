package com.nyang.cat.dev.dishes.repository;

import com.nyang.cat.domain.Dish;
import com.nyang.cat.domain.DishGpsLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DishGpsLogRepository extends JpaRepository<DishGpsLog, Long> {

    Optional<DishGpsLog> findTop1ByDishOrderByCreatedDate(Dish dish);
}
