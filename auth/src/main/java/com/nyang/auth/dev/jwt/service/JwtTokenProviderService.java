package com.nyang.auth.dev.jwt.service;

import java.util.Base64;
import java.util.Date;

import javax.annotation.PostConstruct;

import org.springframework.stereotype.Service;

import com.nyang.auth.dev.jwt.dto.JwtToken;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Service
public class JwtTokenProviderService {

	// TODO : key, period 따로 빼기
	private String secretKey = "dsj1jnasd12321SFSERWE312AS12dfgSDA12";
	private final Long tokenPeriod = 1000L * 60L * 60L * 24L * 7L;
	private final Long refreshPeriod = 1000L * 60L * 60L * 24L * 30L * 3L;

	@PostConstruct
	protected void init() {
		secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
	}

	public JwtToken generateToken(String uid, String provider, String role) {

		Claims claims = Jwts.claims().setSubject(uid);
		claims.put("provider", provider);
		claims.put("role", role);

		Date now = new Date();
		return new JwtToken(
			Jwts.builder()
				.setClaims(claims)
				.setIssuedAt(now)
				.setExpiration(new Date(now.getTime() + tokenPeriod))
				.signWith(SignatureAlgorithm.HS256, secretKey)
				.compact(),
			Jwts.builder()
				.setClaims(claims)
				.setIssuedAt(now)
				.setExpiration(new Date(now.getTime() + refreshPeriod))
				.signWith(SignatureAlgorithm.HS256, secretKey)
				.compact());
	}

	public boolean verifyToken(String token) {
		try {
			Jws<Claims> claims = Jwts.parserBuilder()
				.setSigningKey(secretKey)
				.build()
				.parseClaimsJws(token);
			return claims.getBody()
				.getExpiration()
				.after(new Date());
		} catch (Exception e) {
			return false;
		}
	}

	public String getUid(String token) {
		return Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token).getBody().getSubject();
	}

	public String getValue(String token, String key) {
		Claims claims = Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token).getBody();
		if(claims.containsKey(key)) {
			return claims.get(key).toString();
		} else {
			return "";
		}
	}
}
