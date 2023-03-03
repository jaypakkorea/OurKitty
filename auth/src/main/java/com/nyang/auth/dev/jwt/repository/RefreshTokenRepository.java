package com.nyang.auth.dev.jwt.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nyang.auth.domain.RefreshToken;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {

	boolean existsByRefreshToken(String refreshToken);

	Optional<RefreshToken> findByUser_Id(Long userId);

	Optional<RefreshToken> findByAdmin_Id(Long adminId);
}
