package com.nyang.cat.dev.dishes.dto;

import org.springframework.web.multipart.MultipartFile;

import com.nyang.cat.domain.AdminGroup;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class DishAddDto {

	private Long dishId;
	private String serialNumber;
	private String dishName;
	private String otherNote;
	private Double lat;
	private Double lon;
	private String loadAddress;
	private String imageUrl;
}
