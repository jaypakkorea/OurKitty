package com.nyang.auth.dev.user.oauth2;

import java.io.IOException;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.nyang.auth.dev.jwt.dto.AuthDto;
import com.nyang.auth.dev.jwt.dto.JwtToken;
import com.nyang.auth.dev.jwt.repository.RefreshTokenRepository;
import com.nyang.auth.dev.jwt.service.JwtTokenProviderService;
import com.nyang.auth.dev.user.repository.UserRepository;
import com.nyang.auth.domain.RefreshToken;
import com.nyang.auth.domain.User;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Component
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {
	private final JwtTokenProviderService jwtTokenProviderService;
	private final UserRequestMapper userRequestMapper;
	private final UserRepository userRepository;
	private final RefreshTokenRepository refreshTokenRepository;
	@Value("${auth.redirect-url}")
	private String REDIRECT_URL;

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
		Authentication authentication) throws IOException {
		OAuth2User oAuth2User = (OAuth2User)authentication.getPrincipal();
		AuthDto authDto = userRequestMapper.toDto(oAuth2User);

		Optional<User> userOptional = userRepository.findUserByAccountIdAndProvider(authDto.getId(),
			authDto.getProvider());

		User user;
		if (userOptional.isEmpty()) {
			user = User.builder()
				.accountId(authDto.getId())
				.provider(authDto.getProvider())
				.profileImageUrl(authDto.getPicture())
				.nickName("")
				.userState(0)
				.isAgreeLocationProvision(false)
				.build();

			userRepository.save(user);

			user.changeNickName("사용자-" + user.getId());

			userRepository.save(user);
		} else {
			user = userOptional.get();
		}

		JwtToken jwtToken = jwtTokenProviderService.generateToken(authDto.getId(), authDto.getProvider(), "USER");

		log.info("{}", jwtToken);

		saveRefresh(jwtToken.getRefreshToken(), user);

		response.sendRedirect(
			REDIRECT_URL +
				"?token=" + jwtToken.getToken() +
				"&refresh=" + jwtToken.getRefreshToken());
	}

	private void saveRefresh(String refresh, User user) {

		Optional<RefreshToken> refreshTokenOptional = refreshTokenRepository.findByUser_Id(user.getId());

		RefreshToken refreshToken;

		if(refreshTokenOptional.isEmpty()) {
			refreshToken = RefreshToken.builder().user(user).refreshToken(refresh).build();
		} else {
			refreshToken = refreshTokenOptional.get();
		}

		refreshToken.updateRefreshToken(refresh);

		refreshTokenRepository.save(refreshToken);
	}
}
