package com.nyang.cat.dev.communities.dto.user;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class UserCommunityCommentDto {
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
