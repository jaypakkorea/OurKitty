package com.nyang.cat.dev.dishes.repository;

import java.util.Optional;

import javax.swing.text.html.Option;
import javax.transaction.Transactional;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.nyang.cat.domain.Dish;

@SpringBootTest
public class DishRepositoryTest {

	@Autowired private DishRepository dishRepository;

	@Transactional
	@Test
	public void addTest() throws Exception {
	    //given
	    Dish dish = Dish.builder()
			.serialNumber("123")
			.dishName("냥그릇1")
			.otherNote("메모")
			.build();

	    //when
		Long saveId = dishRepository.save(dish).getId();
		Dish findDish = dishRepository.findById(saveId).get();


	    //then
		Assertions.assertThat(findDish.getId()).isEqualTo(saveId);
		Assertions.assertThat(findDish).isEqualTo(dish);
	}

	@Transactional
	@Test
	public void updateTest() throws Exception {
	    //given
		Dish dish = Dish.builder()
			.serialNumber("123")
			.dishName("냥그릇1")
			.otherNote("메모")
			.build();
	    Long saveId = dishRepository.save(dish).getId();

	    //when
		dish.update("냥그릇 수정","메모 수정");
		dishRepository.save(dish);

		Dish updateDish = dishRepository.findById(saveId).get();
	    
	    //then
		Assertions.assertThat(updateDish.getDishName()).isEqualTo("냥그릇 수정");
		Assertions.assertThat(updateDish.getOtherNote()).isEqualTo("메모 수정");
	}

	@Transactional
	@Test
	public void deleteTest() throws Exception {
	    //given
		Dish dish = Dish.builder()
			.serialNumber("123")
			.dishName("냥그릇1")
			.otherNote("메모")
			.build();
		Long saveId = dishRepository.save(dish).getId();

	    //when
		dishRepository.delete(dish);
		Optional<Dish> findDish = dishRepository.findById(dish.getId());

	    //then
		Assertions.assertThat(findDish.isEmpty());
	}

}
