package com.nyang.auth.dev.admin.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nyang.auth.domain.AdminGroup;

public interface AdminGroupRepository extends JpaRepository<AdminGroup, Long> {

	Optional<AdminGroup> findAdminGroupByGroupName(String groupName);
}
