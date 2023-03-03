package com.nyang.auth.dev.user.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nyang.auth.dev.user.dto.UserDto;
import com.nyang.auth.dev.user.service.UserService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/users")
public class UserController {

	private final UserService userService;

	@GetMapping
	private ResponseEntity<?> userDetails(@RequestHeader(value = "Authorization") String token) {

		UserDto userDto = userService.findUser(token);

		return ResponseEntity.ok(userDto);
	}
}
