package com.nyang.cat.dev.communities.dto.user;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

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
public class UserCommunityDetailDto {

    private Long communityId;
    private Long communityUserId;
    private String communityCategoryName;
    private String content;
    private String userName;
    private String userImg;

    private String userCommentImg;

    private Integer likeCount;
    private Integer commentCount;
    private Integer reportsCount;
    private Boolean isReport;
    private Boolean isLike;
    private Boolean isScrap;
    private Boolean isUser;

    private String region;
    private Long dishId;
    private String dishName;
    private List<String> communityImgs;


    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime createdAt;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime modifiedAt;
}
