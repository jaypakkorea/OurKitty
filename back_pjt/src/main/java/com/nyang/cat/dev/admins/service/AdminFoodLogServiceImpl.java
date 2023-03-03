package com.nyang.cat.dev.admins.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

import javax.transaction.Transactional;

import com.nyang.cat.dev.dishes.dto.DishDto;
import com.nyang.cat.dev.dishes.repository.DishRepository;
import com.nyang.cat.domain.Dish;
import org.springframework.stereotype.Service;

import com.nyang.cat.dev.admins.dto.LogDto;
import com.nyang.cat.dev.admins.dto.AdminDto;
import com.nyang.cat.dev.dishes.repository.DishFoodLogRepository;
import com.nyang.cat.domain.DishFoodLog;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class AdminFoodLogServiceImpl implements AdminFoodLogService {

	private final DishFoodLogRepository dishFoodLogRepository;

	private final AdminAuthService adminAuthService;

	private final DishRepository dishRepository;

	@Transactional
	@Override
	public List<LogDto> findFoodLogs(Long dishId, String token, String dayString) {

		LocalDate date = LocalDate.parse(dayString, DateTimeFormatter.ofPattern("yyyy-MM-dd"));
		LocalDateTime start = LocalDateTime.of(date, LocalTime.of(0, 0));
		LocalDateTime end = start.plusDays(1);

		List<DishFoodLog> dishFoodLogList = dishFoodLogRepository.findDishFoodLogByDish_IdAndCreatedDateBetweenOrderByCreatedDateAsc(dishId,
			start, end);

		Optional<DishFoodLog> startFoodLog = dishFoodLogRepository.findTop1ByDish_IdAndCreatedDateBeforeOrderByCreatedDateDesc(
			dishId, start);

		Double weight = startFoodLog.map(DishFoodLog::getFoodWeight).orElse(0.0);

		return makeFoodLogList(dishFoodLogList, weight, start);
	}

	/**
	 * 관리자가 관리하는 냥그릇의 모든 무게 로그 가져오기
	 * @param token
	 * @param day
	 * @return
	 */
	@Transactional
	@Override
	public List<Object> findAllDishFoodLogs(String token, String day) {
		List<Object> list = new ArrayList<>();

		AdminDto adminDto = adminAuthService.findAdmin(token);

		List<Dish> dishList = dishRepository.findDishByAdminGroup_IdAndDishStateLessThan(adminDto.getGroupId(), 2);

		for(Dish dish: dishList) {
			Map<String, Object> map = new HashMap<>();
			List<LogDto> dishLog = findFoodLogs(dish.getId(), token, day);
			map.put("dishId", dish.getId());
			map.put("name", dish.getDishName());
			map.put("data", dishLog);

			list.add(map);
		}

		return list;
	}

	private List<LogDto> makeFoodLogList(List<DishFoodLog> dishFoodLogList,
		Double startWeight, LocalDateTime start) {
		List<LogDto> logDtoList = new ArrayList<>();

		int i = 1;
		int j = 0;

		LocalDateTime logTime = start.plusDays(0);
		Double weight = startWeight / 1000.0;

		while (logTime.isBefore(start.plusDays(1))) {

			while (j < dishFoodLogList.size() && dishFoodLogList.get(j).getCreatedDate().isBefore(logTime)) {
				weight = dishFoodLogList.get(j).getFoodWeight() / 1000.0;
				j++;
			}

			logDtoList.add(LogDto.builder()
				.y(weight.toString())
				.x(logTime.format(DateTimeFormatter.ofPattern("HH:mm")))
				.build());

			logTime = start.plusMinutes(10L * (i++));

		}

		return logDtoList;
	}


}
