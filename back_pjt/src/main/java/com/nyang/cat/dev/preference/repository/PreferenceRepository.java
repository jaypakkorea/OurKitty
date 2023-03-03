package com.nyang.cat.dev.preference.repository;

import java.util.List;
import java.util.Optional;

import com.nyang.cat.domain.Dish;
import com.nyang.cat.domain.Preference;
import com.nyang.cat.domain.User;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PreferenceRepository extends JpaRepository<Preference, Long> {

	Optional<Preference> findDishPreferenceByUserAndDish(User user, Dish dish);
	Optional<Preference> findDishPreferenceByUser_IdAndDish_Id(Long userId, Long dishId);
	List<Preference> findDishPreferencesByDish_Id(Long dishId);
	List<Preference> findByDishOrderByCreatedDateDesc(Dish dish);
}
