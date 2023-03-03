package com.nyang.cat.dev.dishes.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.nyang.cat.domain.DishHistory;

public interface DishHistoryRepository extends JpaRepository<DishHistory, Long> {

	List<DishHistory> findByDishIdOrderByCreatedDateDesc(Long dishId);
}
