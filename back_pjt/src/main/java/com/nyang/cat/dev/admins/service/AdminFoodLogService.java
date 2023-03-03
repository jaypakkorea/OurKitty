package com.nyang.cat.dev.admins.service;

import java.util.List;

import com.nyang.cat.dev.admins.dto.LogDto;

public interface AdminFoodLogService {

	List<LogDto> findFoodLogs(Long dishId, String token, String day);

	List<Object> findAllDishFoodLogs(String token, String day);
}
