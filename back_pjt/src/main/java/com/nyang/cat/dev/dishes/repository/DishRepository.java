package com.nyang.cat.dev.dishes.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nyang.cat.domain.Dish;

public interface DishRepository extends JpaRepository<Dish, Long> {
	Optional<Dish> findBySerialNumber(String serialNumber);

	List<Dish> findDishByLatBetweenAndLonBetweenAndDishStateEquals(Double startLat, Double endLat, Double startLon,
		Double endLon, Integer state);

	List<Dish> findDishByAdminGroup_IdAndDishStateLessThan(Long adminGroupId, Integer state);

	Boolean existsBySerialNumber(String serialNumber);
}
