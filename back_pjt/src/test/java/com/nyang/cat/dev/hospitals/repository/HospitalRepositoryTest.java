package com.nyang.cat.dev.hospitals.repository;

import javax.transaction.Transactional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.nyang.cat.domain.Hospital;

@SpringBootTest
public class HospitalRepositoryTest {

	@Autowired private HospitalRepository hospitalRepository;


	@Transactional
	@Test
	public void addTest() throws Exception {
	    //given
		Hospital hospital = Hospital.builder()
			.hospitalName("삼성병원")
			.address("부산광역시 강서구 ㅁㅁㅁ")
			.lat(123.123)
			.lon(34.323)
			.hospitalPhone("053-123-1234")
			.build();

	    //when

	    //then
	}
}
