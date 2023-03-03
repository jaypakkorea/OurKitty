package com.nyang.cat.dev.admins.service;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.nyang.cat.dev.admins.dto.CommunityListDto;
import com.nyang.cat.dev.admins.dto.CommunityReportDto;
import com.nyang.cat.dev.communities.repository.CommunityCategoryRepository;
import com.nyang.cat.dev.communities.repository.CommunityReportRepository;
import com.nyang.cat.dev.communities.repository.CommunityRepository;
import com.nyang.cat.dev.dishes.repository.DishRepository;
import com.nyang.cat.domain.Community;
import com.nyang.cat.domain.CommunityCategory;
import com.nyang.cat.domain.CommunityReport;
import com.nyang.cat.domain.Dish;

@SpringBootTest
public class AdminServiceImplTest {

	@Autowired
	CommunityRepository communityRepository;

	@Autowired
	CommunityReportRepository communityReportRepository;

	@Autowired
	CommunityCategoryRepository communityCategoryRepository;

	@Autowired
	DishRepository dishRepository;

	@Autowired
	AdminServiceImpl adminService;


	//전체 게시판 글
	private long communityId1;

	//냥그릇 게시판 글
	private long communityId2;

	//냥그릇
	private long dishId;

	private long categoryId;

	private String adminToken;

	@Transactional
	@BeforeEach
	public void 신고내역_저장() {
		adminToken = "123"; //admin 토큰

		// 카테고리 및 내부 이미지 저장.
		CommunityCategory communityCategory = CommunityCategory.builder().categoryName("카테고리 이름").build();
		communityCategoryRepository.save(communityCategory);
		this.categoryId = communityCategory.getId();

		// 게시글
		Community community = Community.builder()
			.communityCategory(communityCategory)
			.dish(null)
			.user(null)
			.content("test1")
			.region("region1")
			.build();
		communityRepository.save(community);
		this.communityId1 = community.getId();

		//냥그릇
		Dish dish = Dish.builder()
			.serialNumber("1234")
			.dishName("냥그릇1")
			.build();
		dishRepository.save(dish);
		this.dishId = dish.getId();

		// 냥그릇의 게시글
		Community community1 = Community.builder()
			.communityCategory(communityCategory)
			.dish(dish)
			.user(null)
			.content("test2")
			.region("region2")
			.build();
		communityRepository.save(community1);
		this.communityId2 = community.getId();

		//신고내역
		for (int i = 0; i < 3; i++) {
			CommunityReport communityReport = CommunityReport.builder()
				.community(community)
				.reportsContent("신고 사유")
				.build();
			communityReportRepository.save(communityReport);
			community.setCommunityReportCountPlus();

			CommunityReport communityReport1 = CommunityReport.builder()
				.community(community1)
				.reportsContent("신고 사유")
				.dishId(this.dishId)
				.build();
			communityReportRepository.save(communityReport1);
			community1.setCommunityReportCountPlus();
		}
		communityRepository.save(community);
		communityRepository.save(community1);

	}

	@Transactional
	@Test
	public void 전체게시판_신고글_조회() throws Exception {
	    //given
	    //when
		List<CommunityListDto> communityList = adminService.findReportedCommunity(adminToken);

	    //then
		Assertions.assertThat(communityList.size()).isNotEqualTo(0);
	}

	@Transactional
	@Test
	public void 냥그릇게시판_신고글_조회() throws Exception {
	    //given

		List<CommunityListDto> communityList = adminService.findReportedCommunityByDishId(dishId, adminToken);

		//then
		Assertions.assertThat(communityList.get(0).getId()).isNotEqualTo(0);
	}

	@Transactional
	@Test
	public void 게시글_신고내역_조회() throws Exception {
	    //given

	    //when
		List<CommunityReportDto> communityReportDtoList = adminService.findReportsByCommunity(communityId1, adminToken);

	    //then
		Assertions.assertThat(communityReportDtoList.size()).isEqualTo(3);
		Assertions.assertThat(communityReportDtoList.get(0).getCommunityId()).isEqualTo(communityId1);
		Assertions.assertThat(communityReportDtoList.get(0).getReportsContent()).isEqualTo("신고 사유");
	}

	@Transactional
	@Test
	public void 게시글_블락처리() throws Exception {
	    //given

	    //when
		adminService.blockCommunity(communityId2, adminToken);

		Community community = communityRepository.findById(communityId2).get();

	    //then
		Assertions.assertThat(community.getCommunityState()).isEqualTo(1);
	}
}
