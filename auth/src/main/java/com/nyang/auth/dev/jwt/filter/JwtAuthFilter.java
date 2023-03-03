package com.nyang.auth.dev.jwt.filter;

import java.io.IOException;
import java.util.List;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

import com.nyang.auth.dev.jwt.dto.AuthDto;
import com.nyang.auth.dev.jwt.service.JwtTokenProviderService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class JwtAuthFilter extends GenericFilterBean {
	private final JwtTokenProviderService jwtTokenProviderService;

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws
		IOException,
		ServletException {
		String token = ((HttpServletRequest)request).getHeader("Authorization");

		if (token != null && jwtTokenProviderService.verifyToken(token)) {
			String id = jwtTokenProviderService.getUid(token);
			String role = jwtTokenProviderService.getValue(token, "role");

			AuthDto authDto = AuthDto.builder()
				.id(id).build();

			Authentication auth;

			if ("admin".equals(role)) {
				auth = getAuthentication(authDto, "ADMIN");
			} else if ("USER".equals(role)) {
				auth = getAuthentication(authDto, "USER");
			} else {
				throw new RuntimeException();
			}

			SecurityContextHolder.getContext().setAuthentication(auth);
		}

		chain.doFilter(request, response);
	}

	public Authentication getAuthentication(AuthDto authDto, String role) {
		return new UsernamePasswordAuthenticationToken(authDto, "",
			List.of(new SimpleGrantedAuthority(role)));
	}
}