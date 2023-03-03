package com.nyang.cat.dev.admins.dto;

import java.time.LocalDateTime;

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
public class DishVisitImageDto {
	private String imgUrl;

	private LocalDateTime createdDate;

}
