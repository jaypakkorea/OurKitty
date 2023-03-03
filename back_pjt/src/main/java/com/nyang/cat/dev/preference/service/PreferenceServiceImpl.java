package com.nyang.cat.dev.preference.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.nyang.cat.dev.admins.dto.AdminDto;
import com.nyang.cat.dev.admins.service.AdminAuthService;
import com.nyang.cat.dev.admins.service.AdminFoodLogService;
import com.nyang.cat.dev.admins.service.AdminFoodLogServiceImpl;
import com.nyang.cat.dev.dishes.repository.DishRepository;
import com.nyang.cat.dev.preference.dto.PreferenceDto;
import com.nyang.cat.dev.preference.repository.PreferenceRepository;
import com.nyang.cat.dev.users.dto.UserDto;
import com.nyang.cat.dev.users.repository.UserRepository;
import com.nyang.cat.dev.users.service.UserAuthService;
import com.nyang.cat.dev.util.converter.PreferenceConverter;
import com.nyang.cat.domain.Dish;
import com.nyang.cat.domain.Preference;
import com.nyang.cat.domain.User;
import com.nyang.cat.exception.common.CustomException;
import com.nyang.cat.exception.constants.ErrorCode;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class PreferenceServiceImpl implements PreferenceService {

	private final UserAuthService userAuthService;
	private final AdminAuthService adminAuthService;
	private final PreferenceRepository preferenceRepository;
	private final DishRepository dishRepository;
	private final UserRepository userRepository;


	/**
	 * 새로운 선호도 결과를 추가하거나 이전의 선호고 결과를 수정하는 메서드
	 * @param preferenceDto	저장할 선호도 내용이 들어있는 DTO
	 * @param token			권한 인증 및 유저 정보를 불러오기 위한 엑세스 토큰
	 */
	public void addPreference(PreferenceDto preferenceDto, String token) {

		// token 을 이용해 권한 체크 및 이전에 작성한 선호도 결과가 있는지 확인한다.
		Long userId = checkAuth(token);
		User user = userRepository.getReferenceById(userId);
		Dish dish = dishRepository.getReferenceById(preferenceDto.getDishId());
		Optional<Preference> optionalPreference = preferenceRepository.findDishPreferenceByUserAndDish(user, dish);

		// 이전에 작성한 선호도 결과가 없다면 새로운 객체 생성
		Preference preference = optionalPreference.orElseGet(() -> Preference.builder()
			.dish(dish)
			.user(user)
			.build());

		// 선호도 내용을 반영
		preference.modify(preferenceDto.getPreferenceResult(), preferenceDto.getReason());

		// 결과를 반영
		preferenceRepository.save(preference);
	}

	/**
	 * 로그인한 사용자의 특정 냥그릇에 대한 선호도 결과 값을 가져오는 메서드
	 * @param dishId	특정 냥그릇의 ID 값
	 * @param token		권한 인증 및 유저 정보를 불러오기 위한 엑세스 토큰
	 * @return			선호도 결과 값이 있다면 DTO 리턴 없다면 null 리턴
	 */
	public PreferenceDto findPreference(Long dishId, String token) {

		// 토큰을 이용해 권한을 체크하고 유저의 ID 값을 가져온다.
		Long userId = checkAuth(token);

		// 유저와 냥그릇의 ID 값으로 선호도 결과를 조회
		Optional<Preference> preference = preferenceRepository.findDishPreferenceByUser_IdAndDish_Id(userId, dishId);

		// 결과가 있다면 결과 DTO 리턴 없다면 null 리턴
		return preference.map(PreferenceConverter::preferenceConvertToDto).orElse(null);
	}

	/**
	 * 관리자가 특정 냥그릇에 대한 모든 선호도 결과 값을 가져오기 위한 메서드
	 * @param dishId	특정 냥그릇 ID 값
	 * @param token 	관리자 권한 인증을 위한 엑세스 토큰
	 * @return			선호도 결과 DTO LIST
	 */
	public List<PreferenceDto> findPreferences(Long dishId, String token) {

		// 관리자 권한 체크
		AdminDto adminDto = adminAuthService.findAdmin(token);


		if(adminDto == null) {
			throw new CustomException(ErrorCode.NO_AUTHORITY);
		}

		// 냥그릇 ID 값의 선호도 결과를 모두 부르고 DTO 로 변환하여 리턴
		List<Preference> preferenceList = preferenceRepository.findDishPreferencesByDish_Id(dishId);
		List<PreferenceDto> preferenceDtoList = new ArrayList<>();
		for (Preference preference : preferenceList) {
			preferenceDtoList.add(PreferenceConverter.preferenceConvertToDto(preference));
		}

		return preferenceDtoList;
	}

	/**
	 * 관리자가 관리하는 모든 냥그릇에 대한 선호도를 리스트로 가져오는 메서드
	 * @param token		관리자의 권한 체크 및 관리하는 냥그릇을 불러오기 위한 관리자 토큰
	 * @return			관리자가 관리하는 모든 냥그릇에 대한 선호도의 DTO 리스트 (냥그릇 사이 구분을 위해 중간에 빈 데이터를 넣음)
	 */
	public List<PreferenceDto> findAdminAllPreferences(String token) {

		// 관리자 권한 체크
		AdminDto adminDto = adminAuthService.findAdmin(token);

		List<Dish> dishList = dishRepository.findDishByAdminGroup_IdAndDishStateLessThan(adminDto.getGroupId(), 2);

		List<PreferenceDto> preferenceDtoList = new ArrayList<>();
		for(Dish dish : dishList) {
			List<Preference> preferenceList = preferenceRepository.findByDishOrderByCreatedDateDesc(dish);

			for(Preference preference : preferenceList) {
				preferenceDtoList.add(PreferenceConverter.preferenceConvertToDto(preference));
			}

			preferenceDtoList.add(PreferenceDto.builder().build());
		}

		return preferenceDtoList;
	}

	/**
	 * 로그인 사용자 권한 체크 및 ID 값을 가져오는 메서드
	 * @param token		권한 체크 및 ID 값을 가져오기 위한 엑세스 토큰
	 * @return			사용자의 ID 값
	 */
	private Long checkAuth(String token) {

		UserDto userDto = userAuthService.findUser(token, true);

		return userDto.getId();
	}

}
