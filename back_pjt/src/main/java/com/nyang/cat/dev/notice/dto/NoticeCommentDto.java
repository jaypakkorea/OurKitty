package com.nyang.cat.dev.notice.dto;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
@Builder
public class NoticeCommentDto {

	private Long commentId;
	private String userName;
	private String userImg;
	private String content;
	private int likeCount;
	private Boolean isLike;
	private Boolean isUser;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Seoul")
	private LocalDateTime createdAt;
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Seoul")
	private LocalDateTime modifiedAt;
}
