package com.nyang.cat.dev.admins.dto;

import java.time.LocalDate;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class DishVisitGraphDto {

	private LocalDate x;

	private int y;

	private List<DishVisitImageDto> imgs;

	public void plusY(){
		y += 1;
	}

	public void addImg(DishVisitImageDto imageDto) {
		imgs.add(imageDto);
	}
}
