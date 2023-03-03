package com.nyang.cat.dev.dishes.dto;

import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder
public class LocationDto {
	private Long dishId;
	private Double lat;
	private Double lon;
	private String loadAddress;
	private MultipartFile image;
}
