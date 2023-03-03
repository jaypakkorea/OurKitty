package com.nyang.cat;

import java.util.ArrayList;
import java.util.List;

import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.transaction.annotation.Transactional;

import com.nyang.cat.dev.admins.repository.AdminGroupRepository;
import com.nyang.cat.dev.communities.repository.CommunityCategoryRepository;
import com.nyang.cat.dev.dishes.repository.DishRepository;
import com.nyang.cat.dev.pictures.repository.PictureIoTCatImgRepository;
import com.nyang.cat.domain.AdminGroup;
import com.nyang.cat.domain.CommunityCategory;
import com.nyang.cat.domain.Dish;
import com.nyang.cat.domain.IoTCatImg;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Transactional
public class JpaInit {
	private final AdminGroupRepository adminGroupRepository;
	private final DishRepository dishRepository;
	private final PictureIoTCatImgRepository pictureIoTCatImgRepository;

	private final CommunityCategoryRepository communityCategoryRepository;

	@EventListener(ApplicationReadyEvent.class)
	public void initDishDumpData() {
		// Admin dump
		AdminGroup adminGroup = AdminGroup.builder()
			.groupName("testgroup")
			.build();
		adminGroupRepository.save(adminGroup);

		// Dish dump
		Dish dish = Dish.builder()
			.adminGroup(adminGroup)
			.dishName("test")
			.dishState(0)
			.lat(35.09618880732455)
			.lon(128.85360467640996)
			.serialNumber("75200043643")
			.build();
		dishRepository.save(dish);

		String[] data = {
			"https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/29ea02c9-fa87-4dbd-8498-1b68b3f7c2a4.jpeg",
			"https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/b13b700d-6667-4a17-b4ed-880f750d218c.jpeg",
			"https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/8d1b48cf-dd23-4ccf-bbae-12b9d2256ca8.jpeg"
		};

		List<IoTCatImg> imgs = new ArrayList<>();
		for(int i = 0 ; i < data.length ; i++) {
			imgs.add(IoTCatImg.builder().dish(dish).imgUrl(data[i]).build());
		}
		pictureIoTCatImgRepository.saveAll(imgs);


		// 커뮤니티 카테고리 조회
		CommunityCategory communityCategory = CommunityCategory.builder()
			.categoryName("카테고리 이름")
			.build();
		communityCategoryRepository.save(communityCategory);

	}
}
