package com.nyang.cat.dev.pictures.service;

import javax.transaction.Transactional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.nyang.cat.dev.pictures.dto.PictureFormDto;

@SpringBootTest
public class PictureServiceImplTest {

	@Autowired
	private PictureService pictureService;

	@Transactional
	@Test
	public void IoT이미지추가_테스트() throws Exception {
		// given
		PictureFormDto pictureFormDto = PictureFormDto.builder()
				.dishId(1L)
				.imgUrl("테스트url")
				.build();
		pictureService.addPicture(pictureFormDto);
	}
}
