package com.nyang.cat.dev.communities.dto.user;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class UserCommunityCommentModifyDto {
    private String content;

    private List<MultipartFile> imgFiles;
}
