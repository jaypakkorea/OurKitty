package com.nyang.auth.dev.admin.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nyang.auth.dev.admin.dto.AdminDto;
import com.nyang.auth.dev.admin.service.AdminService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/admins")
public class AdminController {

	private final AdminService adminService;

	@PostMapping
	private ResponseEntity<?> adminAdd(@RequestBody AdminDto adminDto) {

		adminService.addAdmin(adminDto);

		return ResponseEntity.status(HttpStatus.CREATED).body("Admin Registered");
	}

	@GetMapping("/authentication")
	private ResponseEntity<?> adminDetails(@RequestHeader(value = "Authorization") String token) {

		AdminDto adminDto = adminService.findAdmin(token);

		return ResponseEntity.ok(adminDto);
	}
}
