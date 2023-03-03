package com.nyang.cat.dev.admins.dto;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class CommunityReportDto {

    private Long id;

    private Long communityId;

    private Long userId;

    private String userName;

    private String reportsContent;

    //private Integer communityReportState;

    private Long dishId;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime createdDate;

}
