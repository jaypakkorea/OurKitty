package com.nyang.cat.dev.dishes.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.nyang.cat.dev.admins.dto.AdminDto;
import com.nyang.cat.dev.admins.repository.AdminRepository;
import com.nyang.cat.dev.admins.service.AdminAuthService;
import com.nyang.cat.dev.alarms.repository.AlarmHistoryRepository;
import com.nyang.cat.dev.dishes.dto.DishAlarmHistoryDto;
import com.nyang.cat.dev.dishes.dto.DishHistoryDto;
import com.nyang.cat.dev.dishes.repository.DishHistoryRepository;
import com.nyang.cat.dev.dishes.repository.DishRepository;
import com.nyang.cat.dev.util.converter.DishHistoryConverter;
import com.nyang.cat.domain.Admin;
import com.nyang.cat.domain.AlarmHistory;
import com.nyang.cat.domain.Dish;
import com.nyang.cat.domain.DishHistory;
import com.nyang.cat.exception.common.CustomException;
import com.nyang.cat.exception.constants.ErrorCode;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class DishHistoryServiceImpl implements DishHistoryService {

	private final AdminAuthService adminAuthService;
	private final DishRepository dishRepository;
	private final AlarmHistoryRepository alarmHistoryRepository;
	private final DishHistoryRepository dishHistoryRepository;
	private final AdminRepository adminRepository;

	/**
	 * 특정 냥그릇에 해당하는 알람 히스토리에 저장한 내용들을 불러오는 메서드
	 * @param token            해당 냥그릇에 대한 관리자 권한 인증을 위한 토큰
	 * @param dishId        타겟 냥그릇 아이디
	 * @return 알람 히스토리 DTO 리스트
	 */
	@Override
	public List<DishAlarmHistoryDto> findDishAlarmHistories(String token, Long dishId) {

		check(token, dishId);

		List<AlarmHistory> alarmHistoryList = alarmHistoryRepository.findByTargetIdAndAlarmTypeBetweenOrderByCreatedDateDesc(
			dishId, 110, 120);

		return alarmHistoryList.stream()
			.map(DishHistoryConverter::alarmHistoryConvertToDishAlarmHistoryDto)
			.collect(Collectors.toUnmodifiableList());
	}

	/**
	 * 특정 냥그릇에 해당하는 히스토리들을 불러오는 메서드
	 * @param token            해당 냥그릇에 대한 관리자 권한 인증을 위한 토큰
	 * @param dishId        타겟 냥그릇 아이디
	 * @return 냥그릇 히스토리 DTO 리스트
	 */
	@Override
	public List<DishHistoryDto> findDishHistories(String token, Long dishId) {

		check(token, dishId);

		List<DishHistory> dishHistoryList = dishHistoryRepository.findByDishIdOrderByCreatedDateDesc(dishId);

		return dishHistoryList.stream()
			.map(DishHistoryConverter::dishHistoryConvertToDto)
			.collect(Collectors.toUnmodifiableList());
	}

	/**
	 * 특정 냥그릇에 대한 히스토리를 추가하는 메서드
	 * @param token                해당 냥그릇에 대한 관리자 권한 인증 및 작성자 정보를 저장하기 위한 토큰
	 * @param dishHistoryDto    저장할 히스토리의 내용이 담긴 DTO
	 * @return 저장 결과 ID 값과 작성자 정보가 추가된 DTO
	 */
	@Override
	public DishHistoryDto addDishHistory(String token, DishHistoryDto dishHistoryDto) {

		Dish dish = check(token, dishHistoryDto.getDishId());
		AdminDto adminDto = adminAuthService.findAdmin(token);

		Admin admin = adminRepository.getReferenceById(adminDto.getId());

		DishHistory dishHistory = dishHistoryRepository.save(dishHistoryDto.toEntity(dish, admin));

		return DishHistoryConverter.dishHistoryConvertToDto(dishHistory);
	}

	/**
	 * 해당 냥그릇 ID 가 존재하는 냥그릇의 ID 값인지 체크, 올바른 관리자 토큰인지 체크, 관리자가 해당 냥그릇에 대해 권한이 있는지 체크하는 메서드
	 * @param token            관리자 토큰
	 * @param dishId        냥그릇 ID
	 * @return 냥그릇 Entity
	 */
	private Dish check(String token, Long dishId) {

		Dish dish = dishRepository.findById(dishId).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_ENTITY));
		AdminDto adminDto = adminAuthService.findAdmin(token);

		if (!adminDto.getGroupId().equals(dish.getAdminGroup().getId())) {
			throw new CustomException(ErrorCode.NO_AUTHORITY);
		}

		return dish;
	}
}
