package com.nyang.cat.dev.communities.dto.user;

import lombok.*;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class UserCommunityRequestDto {
    private Long communityCategoryId;
    private String content;
    private Long dishId;
    private List<MultipartFile> imgFiles = new ArrayList<>();
}
