package com.nyang.cat.dev.users.controller;

import com.nyang.cat.dev.communities.dto.user.UserCommunityDetailDto;
import com.nyang.cat.dev.dishes.dto.DishDto;
import com.nyang.cat.dev.pictures.dto.PictureDto;
import com.nyang.cat.dev.users.dto.UserDto;
import com.nyang.cat.dev.users.dto.UserProfile;
import com.nyang.cat.dev.users.service.UserGetService;
import com.nyang.cat.dev.users.service.UserModifyService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@Api(tags = {"냥그릇 선호도"})
public class UserController {

	private final UserModifyService userModifyService;
	private final UserGetService userGetService;

	@PutMapping("/profile-img")
	@ApiOperation(value = "사용자 프로필 이미지 변경")
	private ResponseEntity<?> userProfileImgModify(MultipartFile profileImage,
												   @RequestHeader(value = "Authorization") String token) throws IOException {

		userModifyService.modifyProfileImage(token, profileImage);

		return ResponseEntity.status(HttpStatus.CREATED).body("profileImage is change");
	}

	@PutMapping("/nick-name")
	@ApiOperation(value = "사용자 닉네임 변경")
	private ResponseEntity<?> userNameModify(@RequestBody UserDto userDto, @RequestHeader(value = "Authorization") String token) {

		userModifyService.modifyNickName(token, userDto.getNickName());
		return ResponseEntity.status(HttpStatus.CREATED).body("nickName is change");
	}

	@PutMapping("/location-provision")
	@ApiOperation(value = "사용자 위치 정보 허용 여부 변경")
	private ResponseEntity<?> userLocationProvisionModify(@RequestHeader(value = "Authorization") String token) {

		userModifyService.modifyLocationProvision(token);
		return ResponseEntity.status(HttpStatus.CREATED).body("location provision is change");
	}

	@GetMapping("/{id}")
	@ApiOperation(value = "사용자 프로필 조회")
	public ResponseEntity<?> userProfile(Pageable pageable,  @RequestHeader(value = "Authorization", required = false) String token, @PathVariable Long id){
		UserProfile userProfile = userGetService.getUserProfile(pageable, token, id);
		return ResponseEntity.ok(userProfile);
	}

	@GetMapping("/{id}/communities")
	@ApiOperation(value = "사용자가 작성한 커뮤니티 리스트 조회")
	public ResponseEntity<?> userCommunityList(Pageable pageable,  @RequestHeader(value = "Authorization", required = false) String token, @PathVariable Long id){
		Slice<UserCommunityDetailDto> communityList = userGetService.getCommunityList(pageable, token, id);
		return ResponseEntity.ok(communityList);
	}

	@GetMapping("/{id}/communities/count")
	@ApiOperation(value = "사용자가 작성한 커뮤니티 리스트 전체개수")
	public ResponseEntity<Integer> userCommunityListCount(@RequestHeader(value = "Authorization", required = false) String token, @PathVariable Long id){
		Integer count = userGetService.getCommunityListCount(token, id);
		System.out.println("count = " + count);
		return ResponseEntity.ok(count);
	}


	@GetMapping("/{id}/pictures")
	@ApiOperation(value = "좋아요누른 IOT 사진 목록")
	public ResponseEntity<?> userPictureList(Pageable pageable,  @RequestHeader(value = "Authorization", required = false) String token, @PathVariable Long id){
		Slice<PictureDto> pictureList = userGetService.getPictureList(pageable, token, id);
		return ResponseEntity.ok(pictureList);
	}

	@GetMapping("/{id}/dish")
	@ApiOperation(value = "사용자가 좋아요한 조회")
	public ResponseEntity<?> userDishList(Pageable pageable,  @RequestHeader(value = "Authorization", required = false) String token, @PathVariable Long id){
		Slice<DishDto> dishList = userGetService.getDishList(pageable, token, id);
		return ResponseEntity.ok(dishList);
	}
}
