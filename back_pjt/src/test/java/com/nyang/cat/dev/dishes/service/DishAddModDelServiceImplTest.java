package com.nyang.cat.dev.dishes.service;

import javax.transaction.Transactional;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.nyang.cat.dev.dishes.dto.DishDto;

@SpringBootTest
public class DishAddModDelServiceImplTest {

	@Autowired
	private DishAddModDelService dishAddModDelService;

	@Transactional
	@Test
	public void addDishTest() throws Exception {
		//given
		String serialNumber = "123";
		String dishName = "냥그릇1";
		String otherNote = "냥그릇 메모입니다.";

	}

	@Test
	public void modifyDishTest() throws Exception {
		//given
		String serialNumber = "123";
		String dishName = "냥그릇1";
		String otherNote = "냥그릇 메모입니다.";


		//then
	}
}
