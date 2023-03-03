package com.nyang.auth.dev.user.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nyang.auth.domain.User;

public interface UserRepository extends JpaRepository<User, Long> {

	Optional<User> findUserByAccountIdAndProvider(String accountId, String provider);
}
