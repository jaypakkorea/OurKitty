package com.nyang.cat.dev.pictures.service;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.web.multipart.MultipartFile;

import com.nyang.cat.dev.pictures.dto.PictureDto;
import com.nyang.cat.dev.pictures.dto.PictureFormDto;

public interface PictureService {
	void uploadFileAndSave(String serialNumber, MultipartFile imageFile, String ext) throws Exception;

	PictureFormDto addPicture(PictureFormDto pictureFormDto);

	PictureDto findPicture(Long pictureId, String token);

	Slice<PictureDto> findPictures(Pageable pageable, Long dishId, String token);

	PictureFormDto modifyPicture(PictureDto pictureDto);

	void deletePicture(Long pictureId) throws Exception;

	List<PictureDto> findRecentPictures(String token);

	void likePicture(Long pictureId, String token);

	List<PictureDto> findHungryCatPictures(String token);

	List<PictureDto> findRecentLikeDishImages(String token);

    List<PictureDto> findRecentPicturesByAdmin();
}
