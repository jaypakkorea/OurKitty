package com.nyang.cat.dev.dishes.repository;

import java.util.List;
import java.util.Optional;

import com.nyang.cat.domain.Dish;
import com.nyang.cat.domain.DishLike;
import com.nyang.cat.domain.User;

import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DishLikeRepository extends JpaRepository<DishLike, Long> {

	List<DishLike> findDishLikesByUser_Id(Long userId);

	Optional<DishLike> findDishLikeByDishAndUser_Id(Dish dish,Long userId);

	List<DishLike> findDishLikesByDish_Id(Long dishId);

	Slice<DishLike> findSliceByUserAndDish_DishState(User user, Integer state);

}
