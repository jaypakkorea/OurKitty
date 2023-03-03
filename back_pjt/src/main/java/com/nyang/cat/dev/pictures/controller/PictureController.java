package com.nyang.cat.dev.pictures.controller;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.nyang.cat.dev.pictures.dto.PictureDto;
import com.nyang.cat.dev.pictures.dto.PictureFormDto;
import com.nyang.cat.dev.pictures.service.PictureService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/pictures")
@RequiredArgsConstructor
@Api(tags = {"IoT 사진"})
public class PictureController {

	private final PictureService pictureService;

	@ApiOperation(value = "해당 냥그릇에 전송받은 IoT 사진을 파일 서버와 DB에 저장")
	@PostMapping("/{serialNumber}")
	public ResponseEntity<?> pictureAdd(@PathVariable String serialNumber,
		@RequestParam(value = "imageFile", required = false) MultipartFile imageFile,
		@RequestParam(value = "extension", required = false) String ext) throws Exception {

		// 사진인지 필터링

		// Serial Number로 Entity 가져오기
		log.debug("SerialNumber: {}", serialNumber);
		// Upload file and save
		pictureService.uploadFileAndSave(serialNumber, imageFile, ext);

		return new ResponseEntity<Void>(HttpStatus.CREATED);
	}

	@ApiOperation(value = "해당 냥그릇에 사진 이미지 URL 추가하기")
	@PostMapping("/dishes/{dishId}")
	public ResponseEntity<?> pictureAdd(@RequestBody PictureFormDto pictureFormDto) {
		PictureFormDto result = pictureService.addPicture(pictureFormDto);

		return ResponseEntity.status(HttpStatus.CREATED).body(result);
	}

	@ApiOperation(value = "사진 정보 불러오기")
	@GetMapping("/{pictureId}")
	public ResponseEntity<?> pictureDetails(@PathVariable("pictureId") Long pictureId,
		@RequestHeader(value = "Authorization", required = false) String token) {

		PictureDto result = pictureService.findPicture(pictureId, token);

		return ResponseEntity.status(HttpStatus.OK).body(result);
	}

	@ApiOperation(value = "해당 냥그릇의 IoT 사진들 불러오기")
	@GetMapping("/dishes/{dishId}")
	public ResponseEntity<?> pictureList(@PathVariable("dishId") Long dishId,
		@RequestHeader(value = "Authorization", required = false) String token, Pageable pageable) {

		Slice<PictureDto> list = pictureService.findPictures(pageable, dishId, token);

		return ResponseEntity.status(HttpStatus.OK).body(list);
	}

	@ApiOperation(value = "해당 사진 정보 변경하기")
	@PutMapping("/{pictureId}")
	public ResponseEntity<?> pictureModify(@RequestBody PictureDto pictureDto) {
		PictureFormDto result = pictureService.modifyPicture(pictureDto);
		return ResponseEntity.status(HttpStatus.CREATED).body(result);
	}

	@ApiOperation(value = "해당 사진을 DB와 파일서버에서 삭제하기")
	@DeleteMapping("/{pictureId}")
	public ResponseEntity<?> pictureRemove(@PathVariable("pictureId") Long pictureId) throws Exception {
		pictureService.deletePicture(pictureId);

		return ResponseEntity.status(HttpStatus.OK).body("사진 삭제 성공");
	}

	@ApiOperation(value = "최신 IoT 사진 가져오기")
	@GetMapping("/recent")
	public ResponseEntity<?> recentPictureList(@RequestHeader(value = "Authorization", required = false) String token) {
		List<PictureDto> list = pictureService.findRecentPictures(token);
		return ResponseEntity.status(HttpStatus.OK).body(list);
	}

	@ApiOperation(value = "[관리자용] 최신 IoT 사진 가져오기")
	@GetMapping("/recent/admin")
	public ResponseEntity<?> recentPictureListByAdmin(@RequestHeader(value = "Authorization") String token) {
		List<PictureDto> list = pictureService.findRecentPicturesByAdmin();
		return ResponseEntity.status(HttpStatus.OK).body(list);
	}

	@ApiOperation(value = "사진 좋아요 누르기")
	@GetMapping("/{pictureId}/like")
	public ResponseEntity<?> pictureLike(@RequestHeader(value = "Authorization") String token,
		@PathVariable("pictureId") Long pictureId) {
		pictureService.likePicture(pictureId, token);
		return ResponseEntity.status(HttpStatus.OK).body("사진 좋아요 성공");
	}

	@ApiOperation(value = "배고픈 고양이 사진 불러오기")
	@GetMapping("/hungry-cats")
	public ResponseEntity<?> hungryList(@RequestHeader(value = "Authorization", required = false) String token) {

		List<PictureDto> list = pictureService.findHungryCatPictures(token);

		return ResponseEntity.ok(list);
	}

	@ApiOperation(value = "좋아요한 냥그릇에서 최근에 찍힌 IoT 사진 불러오기")
	@GetMapping("/like-dishes-cats")
	public ResponseEntity<?> recentLikeDishImageList(@RequestHeader(value = "Authorization", required = false) String token) {

		List<PictureDto> list = pictureService.findRecentLikeDishImages(token);

		return ResponseEntity.ok(list);
	}
}
