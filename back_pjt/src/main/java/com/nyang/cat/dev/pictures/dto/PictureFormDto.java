package com.nyang.cat.dev.pictures.dto;

import javax.validation.constraints.NotBlank;

import com.nyang.cat.domain.IoTCatImg;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PictureFormDto {
	@NotBlank
	private Long dishId;
	@NotBlank
	private String imgUrl;

	@Builder
	public PictureFormDto(IoTCatImg ioTCatImg) {
		this.dishId = ioTCatImg.getId();
		this.imgUrl = ioTCatImg.getImgUrl();
	}
}
