package com.nyang.cat.dev.preference.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nyang.cat.dev.preference.dto.PreferenceDto;
import com.nyang.cat.dev.preference.service.PreferenceService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/preference")
@RequiredArgsConstructor
@Api(tags = {"냥그릇 선호도"})
@Slf4j
public class PreferenceController {

	private final PreferenceService preferenceService;

	@ApiOperation(value = "냥그릇 선호도 추가 혹은 수정")
	@PostMapping
	public ResponseEntity<?> preferenceAdd(@RequestBody PreferenceDto preferenceDto,
		@RequestHeader(value = "Authorization") String token) {

		preferenceService.addPreference(preferenceDto, token);

		return ResponseEntity.status(HttpStatus.CREATED).body("ok");

	}

	@ApiOperation(value = "사용자의 특정 냥그릇에 대한 선호도 결과 불러오기")
	@GetMapping("/users/{id}")
	public ResponseEntity<?> preferenceUserDishDetail(@PathVariable(value = "id") Long dishId,
		@RequestHeader(value = "Authorization") String token) {

		PreferenceDto preferenceDto = preferenceService.findPreference(dishId, token);

		if (preferenceDto == null) {
			return ResponseEntity.noContent().build();
		} else {
			return ResponseEntity.ok(preferenceDto);
		}

	}

	@ApiOperation(value = "관리자가 특정 냥그릇에 대한 모든 선호도 결과 불러오기")
	@GetMapping("/admins/{id}")
	public ResponseEntity<?> preferenceDishList(@PathVariable(value = "id") Long dishId,
		@RequestHeader(value = "Authorization") String token) {
		List<PreferenceDto> preferenceDto = preferenceService.findPreferences(dishId, token);

		return ResponseEntity.ok(preferenceDto);
	}

	@ApiOperation(value = "관리자가 관리하는 모든 냥그릇에 대한 모든 선호도 결과 불러오기")
	@GetMapping("/admins")
	public ResponseEntity<?> preferenceList(@RequestHeader(value = "Authorization") String token) {
		List<PreferenceDto> preferenceDto = preferenceService.findAdminAllPreferences(token);

		return ResponseEntity.ok(preferenceDto);
	}
}
