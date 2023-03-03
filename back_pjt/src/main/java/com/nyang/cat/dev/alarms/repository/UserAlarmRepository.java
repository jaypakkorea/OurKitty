package com.nyang.cat.dev.alarms.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nyang.cat.domain.UserAlarm;

public interface UserAlarmRepository extends JpaRepository<UserAlarm, Long> {

	List<UserAlarm> findByUser_IdOrderByCreatedDateDesc(Long userId);
}
