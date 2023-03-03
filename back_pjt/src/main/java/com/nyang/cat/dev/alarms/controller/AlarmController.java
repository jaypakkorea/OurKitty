package com.nyang.cat.dev.alarms.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nyang.cat.dev.alarms.dto.AlarmDto;
import com.nyang.cat.dev.alarms.service.AlarmHandleService;
import com.nyang.cat.dev.alarms.service.AlarmLoadService;

import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/alarms")
@RequiredArgsConstructor
@Api(tags = {"알람"})
public class AlarmController {

	private final AlarmLoadService alarmLoadService;
	private final AlarmHandleService alarmHandleService;

	@GetMapping("/admins")
	private ResponseEntity<?> adminAlarmList(@RequestHeader(value = "Authorization") String token) {

		List<AlarmDto> list = alarmLoadService.findAdminAlarms(token);

		return ResponseEntity.ok(list);
	}

	@PutMapping("/admins/{id}")
	private ResponseEntity<?> adminAlarmModify(@RequestHeader(value = "Authorization") String token,
		@PathVariable Long id) {

		alarmHandleService.modifyAdminAlarmState(token, id);

		return ResponseEntity.status(HttpStatus.CREATED).build();

	}

	@DeleteMapping("/admins/{id}")
	private ResponseEntity<?> adminAlarmDelete(@RequestHeader(value = "Authorization") String token,
		@PathVariable Long id) {

		alarmHandleService.deleteAdminAlarmState(token, id);

		return ResponseEntity.status(HttpStatus.CREATED).build();

	}

	@GetMapping("/users")
	private ResponseEntity<?> userAlarmList(@RequestHeader(value = "Authorization") String token) {

		List<AlarmDto> list = alarmLoadService.findUserAlarms(token);

		return ResponseEntity.ok(list);
	}

	@PutMapping("/users/{id}")
	private ResponseEntity<?> userAlarmModify(@RequestHeader(value = "Authorization") String token,
		@PathVariable Long id) {

		alarmHandleService.modifyUserAlarmState(token, id);

		return ResponseEntity.status(HttpStatus.CREATED).build();
	}

	@DeleteMapping("/users/{id}")
	private ResponseEntity<?> userAlarmDelete(@RequestHeader(value = "Authorization") String token,
		@PathVariable Long id) {

		alarmHandleService.deleteUserAlarmState(token, id);

		return ResponseEntity.status(HttpStatus.CREATED).build();
	}
}
