package com.nyang.cat.dev.admins.repository;

import java.util.List;

import com.nyang.cat.domain.Admin;
import com.nyang.cat.domain.AdminGroup;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository extends JpaRepository<Admin, Long> {

	List<Admin> findAdminsByGroup_Id(Long groupId);
}
