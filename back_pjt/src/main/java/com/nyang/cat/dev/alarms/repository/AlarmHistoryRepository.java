package com.nyang.cat.dev.alarms.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nyang.cat.domain.AlarmHistory;

public interface AlarmHistoryRepository extends JpaRepository<AlarmHistory, Long> {

	Optional<AlarmHistory> findTop1ByTargetIdAndAlarmTypeOrderByCreatedDateDesc(Long targetId, Integer alarmType);

	List<AlarmHistory> findByTargetIdAndAlarmTypeBetweenOrderByCreatedDateDesc(Long targetId, Integer start, Integer end);
}
