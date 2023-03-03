package com.nyang.cat.dev.alarms.repository;

import java.util.List;

import com.nyang.cat.domain.Admin;
import com.nyang.cat.domain.AdminAlarm;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminAlarmRepository extends JpaRepository<AdminAlarm, Long> {

	List<AdminAlarm> findByAdmin_IdOrderByCreatedDateDesc(Long adminId);
}
