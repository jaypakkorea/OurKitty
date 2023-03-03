package com.nyang.cat;

import java.util.TimeZone;

import javax.annotation.PostConstruct;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.core.env.Environment;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import com.nyang.cat.dev.admins.repository.AdminGroupRepository;
import com.nyang.cat.dev.communities.repository.CommunityCategoryRepository;
import com.nyang.cat.dev.dishes.repository.DishRepository;
import com.nyang.cat.dev.pictures.repository.PictureIoTCatImgRepository;

import lombok.extern.slf4j.Slf4j;

@EnableJpaAuditing
@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class CatApplication {

	static {
		System.setProperty("com.amazonaws.sdk.disableEc2Metadata", "true");
	}

	@PostConstruct
	public void started() {
		TimeZone.setDefault(TimeZone.getTimeZone("Asia/Seoul"));
	}

	public static void main(String[] args) {
		SpringApplication.run(CatApplication.class, args);
	}

	// @Bean
	// public JpaInit testDataInit(
	// 	AdminGroupRepository adminGroupRepository,
	// 	DishRepository dishRepository,
	// 	PictureIoTCatImgRepository pictureIoTCatImgRepository) {
	// 	return new JpaInit(adminGroupRepository, dishRepository, pictureIoTCatImgRepository);
	// }

}
