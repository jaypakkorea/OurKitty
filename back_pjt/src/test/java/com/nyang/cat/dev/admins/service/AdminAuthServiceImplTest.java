package com.nyang.cat.dev.admins.service;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class AdminAuthServiceImplTest {

	@Autowired
	private AdminAuthService adminAuthService;
	@Test
	public void test() {
		String token = "";
		adminAuthService.findAdmin(token);
	}
}