package com.nyang.cat.dev.admins.dto;

import java.time.LocalDateTime;

import net.bytebuddy.asm.Advice;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommunityListDto {

	private Long id;

	private String communityCategoryName;

	private String content;

	private Long userId;

	private String userName;

	private Integer likeCount;

	private Integer reportsCount;

	private Integer communityState;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Seoul")
	private LocalDateTime createdDate;

}

