package com.nyang.auth.dev.jwt.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nyang.auth.dev.jwt.service.JwtTokenService;
import com.nyang.auth.exception.common.CustomException;
import com.nyang.auth.exception.constants.ErrorCode;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/token")
public class JwtTokenController {
    private final JwtTokenService jwtTokenService;

    @GetMapping("/expired")
    private ResponseEntity<?> auth() {
        throw new CustomException(ErrorCode.TOKEN_EXPIRED);
    }

    @GetMapping("/refresh")
    private ResponseEntity<?> refreshAuth(@RequestHeader(value = "refresh") String refresh) {
        String token = jwtTokenService.refreshToken(refresh);

        return ResponseEntity.ok(token);
    }
}
