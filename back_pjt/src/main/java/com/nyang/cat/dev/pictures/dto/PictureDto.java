package com.nyang.cat.dev.pictures.dto;

import java.time.LocalDateTime;

import com.nyang.cat.domain.Dish;
import com.nyang.cat.domain.IoTCatImg;
import com.nyang.cat.domain.IoTCatImgLike;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class PictureDto {

    private Long id;
    private Dish dish;
    private String imgUrl;
    private Boolean isLike;
    private LocalDateTime createdDate;

    public IoTCatImg toEntity() {
        return IoTCatImg.builder()
            .dish(dish)
            .imgUrl(imgUrl)
            .build();
    }


    @Builder
    public PictureDto(IoTCatImg ioTCatImg, Boolean isLike) {
        this.id = ioTCatImg.getId();
        this.dish = ioTCatImg.getDish();
        this.imgUrl = ioTCatImg.getImgUrl();
        this.isLike = isLike;
        this.createdDate = ioTCatImg.getCreatedDate();
    }
}

