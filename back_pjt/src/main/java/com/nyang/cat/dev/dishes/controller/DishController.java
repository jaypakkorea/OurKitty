package com.nyang.cat.dev.dishes.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

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

import com.nyang.cat.dev.dishes.dto.DishAddDto;
import com.nyang.cat.dev.dishes.dto.DishAlarmHistoryDto;
import com.nyang.cat.dev.dishes.dto.DishDto;
import com.nyang.cat.dev.dishes.dto.DishHistoryDto;
import com.nyang.cat.dev.dishes.dto.DishLikeResultDto;
import com.nyang.cat.dev.dishes.dto.LocationDto;
import com.nyang.cat.dev.dishes.service.DishAddModDelService;
import com.nyang.cat.dev.dishes.service.DishHistoryService;
import com.nyang.cat.dev.dishes.service.DishIotService;
import com.nyang.cat.dev.dishes.service.DishLikeService;
import com.nyang.cat.dev.dishes.service.DishLoadService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/dishes")
@RequiredArgsConstructor
@Slf4j
@Api(tags = {"냥그릇"})
public class DishController {

	private final DishAddModDelService dishAddModDelService;

	private final DishIotService dishIotService;

	private final DishLoadService dishLoadService;

	private final DishLikeService dishLikeService;

	private final DishHistoryService dishHistoryService;

	@GetMapping
	@ApiOperation(value = "위도, 경도 사이 값에 해당하는 냥그릇들을 불러오기")
	public ResponseEntity<?> dishList(@RequestParam Map<String, String> params) {

		List<DishDto> dishDtoList = dishLoadService.findDishes(params);

		return ResponseEntity.ok(dishDtoList);
	}

	@PostMapping
	@ApiOperation(value = "냥그릇 추가 메서드 (시리얼번호, 이름, 비고)")
	public ResponseEntity<?> dishAdd(DishAddDto dishDto, @RequestHeader(value = "Authorization") String token) throws
		IOException {

		log.info("DTO : {}", dishDto);

		DishDto dish = dishAddModDelService.addDish(dishDto, token);

		return ResponseEntity.status(HttpStatus.CREATED).body(dish);

	}

	@PutMapping("/{id}")
	@ApiOperation(value = "냥그릇 수정")
	public ResponseEntity<?> dishModify(DishAddDto dishAddDto, MultipartFile image,
		@RequestHeader(value = "Authorization") String token, @PathVariable(value = "id") Long dishId) throws
		IOException {

		dishAddDto.setDishId(dishId);
		DishDto returnDto = dishAddModDelService.modifyDish(dishAddDto, token, image);

		return ResponseEntity.status(HttpStatus.CREATED).body(returnDto);

	}

	@DeleteMapping("/{id}")
	@ApiOperation(value = "냥그릇 삭제")
	public ResponseEntity<?> dishRemove(@PathVariable("id") Long id,
		@RequestHeader(value = "Authorization") String token) {

		Long returnId = dishAddModDelService.deleteDish(id, token);

		//반환할 객체
		HashMap<String, Object> result = new HashMap<>();
		result.put("id", returnId);

		return ResponseEntity.ok(result);
	}

	@GetMapping("/original-location/{id}")
	@ApiOperation(value = "아이디 값에 해당하는 위도 경도 받아오기")
	public ResponseEntity<?> dishLocationDetails(@PathVariable Long id,
		@RequestHeader(value = "Authorization") String token) {

		LocationDto locationDto = dishAddModDelService.findDishLocation(id, token);

		return ResponseEntity.ok(locationDto);
	}

	@PutMapping("/original-location")
	@ApiOperation(value = "위치 정보, 주소 정보, 사진 정보 추가")
	public ResponseEntity<?> dishLocationAdd(LocationDto locationDto,
		@RequestHeader(value = "Authorization") String token) throws IOException {

		DishDto dishDto = dishAddModDelService.addDishLocation(locationDto, token);

		return ResponseEntity.status(HttpStatus.CREATED).body(dishDto);
	}

	@GetMapping("/{id}")
	@ApiOperation(value = "냥그릇 상세정보 불러오기")
	public ResponseEntity<?> dishDetail(@PathVariable("id") String id) {

		DishDto dishDto = dishLoadService.findDish(Long.parseLong(id));

		return ResponseEntity.ok(dishDto);
	}

	@GetMapping("/admin-groups")
	@ApiOperation(value = "관리자 그룹에 해당하는 냥그릇들 불러오기")
	public ResponseEntity<?> dishAdminList(@RequestHeader(value = "Authorization") String token) {

		List<DishDto> dishDtoList = dishLoadService.findAdminDishes(token);

		log.info("dish DTO LIST : {}", dishDtoList);

		return ResponseEntity.ok(dishDtoList);
	}

	@GetMapping("/like")
	@ApiOperation(value = "사용자가 좋아요한 냥그릇들 불러오기")
	public ResponseEntity<?> dishLikeList(HttpServletRequest request) {
		String token = request.getHeader("Authorization");

		List<DishDto> dishDtoList = dishLikeService.findLikeDishes(token);

		//반환할 객체
		HashMap<String, Object> result = new HashMap<>();
		result.put("dishList", dishDtoList);

		return ResponseEntity.status(HttpStatus.OK).body(result);
	}

	@PostMapping("/{id}/like")
	@ApiOperation(value = "냥그릇 좋아요 추가")
	public ResponseEntity<?> dishLikeAdd(@PathVariable("id") Long id, HttpServletRequest request) {
		String token = request.getHeader("Authorization");

		DishLikeResultDto dishLikeResultDto = dishLikeService.addDishLike(id, token);

		return ResponseEntity.status(HttpStatus.OK).body(dishLikeResultDto);
	}

	@GetMapping("/location")
	@ApiOperation(value = "IoT 기기로 부터 위치정보, 시리얼 번호를 가져와서 저장")
	public ResponseEntity<?> locationAdd(@RequestParam("serialNumber") String serialNumber,
		@RequestParam("lat") Double lat, @RequestParam("lon") Double lon) {

		log.info("location : ({}, {})", lat, lon);

		String returnSerialNumber = dishIotService.locationAdd(serialNumber, lat, lon);

		return ResponseEntity.ok(returnSerialNumber);
	}

	@GetMapping("/weight")
	@ApiOperation(value = "IoT 기기로 부터 무게정보, 시리얼 번호를 가져와서 저장")
	public ResponseEntity<?> weightAdd(@RequestParam("serialNumber") String serialNumber,
		@RequestParam("foodWeight") Double foodWeight) {

		log.info("weight : {}", foodWeight);

		foodWeight = Math.round(foodWeight * 1000) / 1000.0;
		String returnSerialNumber = dishIotService.weightAdd(serialNumber, foodWeight);

		return ResponseEntity.ok(returnSerialNumber);
	}

	@GetMapping("/alarms/histories/{id}")
	@ApiOperation(value = "관리자 냥그릇 알람 히스토리 리스트 불러오기")
	public ResponseEntity<?> dishAlarmHistoryList(@RequestHeader(value = "Authorization") String token,
		@PathVariable(value = "id") Long dishId) {

		List<DishAlarmHistoryDto> dishAlarmHistoryDtoList = dishHistoryService.findDishAlarmHistories(token, dishId);

		return ResponseEntity.ok(dishAlarmHistoryDtoList);
	}

	@GetMapping("/histories/{id}")
	@ApiOperation(value = "관리자 냥그릇 히스토리 리스트 불러오기")
	public ResponseEntity<?> dishHistoryList(@RequestHeader(value = "Authorization") String token,
		@PathVariable(value = "id") Long dishId) {

		List<DishHistoryDto> dishHistoryDtoList = dishHistoryService.findDishHistories(token, dishId);

		return ResponseEntity.ok(dishHistoryDtoList);
	}

	@PostMapping("/histories")
	@ApiOperation(value = "관리자 냥그릇 히스토리 추가하기")
	public ResponseEntity<?> dishHistoryAdd(@RequestHeader(value = "Authorization") String token,
		@RequestBody DishHistoryDto dishHistoryDto) {

		DishHistoryDto returnDto = dishHistoryService.addDishHistory(token, dishHistoryDto);

		return ResponseEntity.ok(returnDto);
	}
}
