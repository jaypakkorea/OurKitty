package com.nyang.cat.dev.pictures.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import com.nyang.cat.domain.Dish;
import com.nyang.cat.domain.IoTCatImg;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PictureIoTCatImgRepository extends JpaRepository<IoTCatImg, Long> {
	Slice<IoTCatImg> findIoTCatImgsByDishOrderByCreatedDateDesc(Pageable pageable, Dish dish);

	List<IoTCatImg> findIoTCatImgsByDishAndCreatedDateBetween(Dish dish, LocalDateTime start, LocalDateTime end);

	List<IoTCatImg> findIoTCatImgByDish_IdAndCreatedDateAfter(Long dishId, LocalDateTime localDateTime);

	Boolean existsIoTCatImgByDish_IdAndCreatedDateAfter(Long dishId, LocalDateTime localDateTime);

	List<IoTCatImg> findTop20ByOrderByIdDesc();

	List<IoTCatImg> findTop50ByIsHungryOrderByCreatedDateDesc(Boolean isHungry);

	@Query(value = "select i from IoTCatImg i where i.dish.id in (select d.dish.id from DishLike d where d.user.id = :userId) order by i.createdDate DESC")
	List<IoTCatImg> findLikeDishImgs(Long userId);
}
