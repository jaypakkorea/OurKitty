package com.nyang.cat.dev.notice.dto;

import java.util.List;

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
public class NoticeDto {

	private Long noticeId;
	private String adminName;
	private String adminGroupName;
	private String content;
	private Integer likeCount;
	private Integer commentCount;
	private Boolean isLike;
	private List<String> noticeImgs;
	private String createdAt;

}
