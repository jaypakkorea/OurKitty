package com.nyang.cat.dev.pictures.service.common;

import javax.transaction.Transactional;

import org.springframework.stereotype.Component;

import com.nyang.cat.dev.pictures.repository.PictureIoTCatImgLikeRepository;
import com.nyang.cat.dev.pictures.repository.PictureIoTCatImgRepository;
import com.nyang.cat.domain.IoTCatImg;
import com.nyang.cat.domain.User;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@Transactional
@Slf4j
@RequiredArgsConstructor
public class PicturesMethod {

	private final PictureIoTCatImgRepository pictureIoTCatImgRepository;
	private final PictureIoTCatImgLikeRepository pictureIoTCatImgLikeRepository;

	public Boolean isPictureLike(User user, IoTCatImg ioTCatImg){
		return pictureIoTCatImgLikeRepository.existsByUserAndIoTCatImgAndState(user, ioTCatImg, 0);
	}
}
