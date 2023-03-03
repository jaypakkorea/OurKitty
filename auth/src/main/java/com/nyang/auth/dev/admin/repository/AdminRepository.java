package com.nyang.auth.dev.admin.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nyang.auth.domain.Admin;

public interface AdminRepository extends JpaRepository<Admin, Long> {

	Optional<Admin> findAdminByAdminEmail(String adminEmail);
}

