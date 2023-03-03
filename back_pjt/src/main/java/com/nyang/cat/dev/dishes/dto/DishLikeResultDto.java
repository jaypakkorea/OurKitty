package com.nyang.cat.dev.dishes.dto;

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
public class DishLikeResultDto {
	private Long dishId;

	//0 : 좋아요 취소, 1 : 좋아요
	private Integer like;
}
