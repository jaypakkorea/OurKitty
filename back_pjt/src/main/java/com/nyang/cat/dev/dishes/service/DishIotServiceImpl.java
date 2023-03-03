package com.nyang.cat.dev.dishes.service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.nyang.cat.dev.alarms.service.AlarmAddService;
import com.nyang.cat.dev.dishes.repository.DishFoodLogRepository;
import com.nyang.cat.dev.dishes.repository.DishGpsLogRepository;
import com.nyang.cat.dev.dishes.repository.DishRepository;
import com.nyang.cat.dev.pictures.repository.PictureIoTCatImgRepository;
import com.nyang.cat.dev.util.UnregisteredLocations;
import com.nyang.cat.dev.util.constants.AlarmType;
import com.nyang.cat.dev.util.constants.IotConstants;
import com.nyang.cat.domain.Dish;
import com.nyang.cat.domain.DishFoodLog;
import com.nyang.cat.domain.DishGpsLog;
import com.nyang.cat.domain.IoTCatImg;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class DishIotServiceImpl implements DishIotService {

	private final AlarmAddService alarmAddService;
	private final DishRepository dishRepository;
	private final DishFoodLogRepository dishFoodLogRepository;
	private final DishGpsLogRepository dishGpsLogRepository;
	private final PictureIoTCatImgRepository pictureIoTCatImgRepository;

	/**
	 * IoT 기기로 부터 위치정보를 받아오는 메서드
	 * @param serialNumber    냥그릇의 시리얼 번호
	 * @param lat            위도 정보
	 * @param lon            경도 정보
	 * @return 냥그릇의 시리얼 번호
	 */
	@Transactional
	@Override
	public String locationAdd(String serialNumber, Double lat, Double lon) {
		//Dish 가져오기
		Optional<Dish> optionalDish = dishRepository.findBySerialNumber(serialNumber);

		// 서버에 저장되지 않은 시리얼 번호의 냥그릇에 대한 위치정보가 들어올 경우 임시로 값을 가지고 있는다.
		if (optionalDish.isEmpty()) {
			UnregisteredLocations.addLocation(serialNumber, lat, lon);
			log.info("UnregisteredLocations add {}" + serialNumber);
		} else {
			Dish dish = optionalDish.get();

			// 위치 설정이 안되 있다면
			if (dish.getLat() == null) {
				//dishGpsLog 생성하고 저장
				DishGpsLog dishGpsLog = DishGpsLog.builder()
					.dish(dish)
					.beforeLat(0.0)
					.beforeLon(0.0)
					.afterLat(lat)
					.afterLon(lon)
					.build();

				dishGpsLogRepository.save(dishGpsLog);

				// 냥그릇의 현재 위치 정보를 수정
				dish.locationModify(lat, lon);
				dishRepository.save(dish);
			} else {
				// 현재 위치 비교
				if (isMove(dish, lat, lon)) {
					// 냥그릇의 이전 위치와 비교해서 이동이 있다면

					//dishGpsLog 생성하고 저장
					DishGpsLog dishGpsLog = DishGpsLog.builder()
						.dish(dish)
						.beforeLat(dish.getLat())
						.beforeLon(dish.getLon())
						.afterLat(lat)
						.afterLon(lon)
						.build();

					dishGpsLogRepository.save(dishGpsLog);

					// 냥그릇의 위치이동을 냥그릇을 관리하는 그룹의 관리자들에게 알람을 보내준다.
					alarmAddService.addAlarm(AlarmType.ADMIN_DISH_LOCATION_CHANGE, dish.getId(),
						dish.getAdminGroup().getId(), null, null, dish.getDishName(), dish.getLat().toString(),
						dish.getLon().toString(), lat.toString(), lon.toString());

					// 냥그릇의 현재 위치 정보를 수정
					dish.locationModify(lat, lon);
					dishRepository.save(dish);
				}
			}
		}

		return serialNumber;
	}

	/**
	 * IoT 기기로 부터 무게정보를 받아오는 메서드
	 * @param serialNumber    냥그릇의 시리얼 번호
	 * @param foodWeight    무게 정보
	 * @return 냥그릇의 시리얼 번호
	 */
	@Transactional
	@Override
	public String weightAdd(String serialNumber, Double foodWeight) {

		if(foodWeight <= IotConstants.MIN_WEIGHT || foodWeight >= IotConstants.MAX_WEIGHT) {
			return "Invalid range";
		}

		//Dish 가져오기
		Optional<Dish> optionalDish = dishRepository.findBySerialNumber(serialNumber);

		// 시리얼 번호에 해당하는 냥그릇이 있어야만 실행
		if (optionalDish.isPresent()) {
			Dish dish = optionalDish.get();
			// 최근 사료 로그 불러오기
			Optional<DishFoodLog> lastDishFoodLogOptional = dishFoodLogRepository.findTop1ByDishOrderByCreatedDateDesc(
				dish);

			// 사료 등록 로그가 없거나 사료량의 변화가 감지된 경우 새로운 로그를 저장
			if (lastDishFoodLogOptional.isEmpty() || isWeightChange(lastDishFoodLogOptional.get(), foodWeight)) {
				DishFoodLog dishFoodLog = DishFoodLog.builder().dish(dish).foodWeight(foodWeight).build();

				dishFoodLogRepository.save(dishFoodLog);

			}

			lastDishFoodLogOptional.ifPresent(dishFoodLog -> makeAlarms(dish, dishFoodLog, foodWeight));
		}

		return serialNumber;
	}

	/**
	 * 냥그릇의 위치가 변경되었는지 감지하기 위한 함수
	 * @param dish    확인할 냥그릇
	 * @param lat    변화한 위도
	 * @param lon    변화한 경도
	 * @return 일정 거리 이상 이동했는지 여부
	 */
	private Boolean isMove(Dish dish, Double lat, Double lon) {
		return Math.abs((dish.getLat() - lat) + (dish.getLon() - lon)) >= IotConstants.LOCATION_CHANGE_LIMIT;
	}

	/**
	 * 냥그릇 무게가 변화를 감지하기 위한 함수
	 * @param dishFoodLog    최근 무게 로그
	 * @param foodWeight    변화한 무게 로그
	 * @return 이전의 무게와 새로 받은 무게의 차이가 일정량 이상인지 여부
	 */
	private Boolean isWeightChange(DishFoodLog dishFoodLog, Double foodWeight) {
		return Math.abs(dishFoodLog.getFoodWeight() - foodWeight) > IotConstants.WEIGHT_CHANGE_LIMIT;
	}

	/**
	 * 냥그릇 무게 정보를 받을 때 알람상황을 확인하고 알람을 생성한다.
	 * @param dish                알람을 생성할 타겟 냥그릇
	 * @param lastDishFoodLog    알람을 생성하기 위해 비교할 최근의 기록
	 * @param foodWeight        알람을 생성하기 위해 비교할 받아온 무게
	 */
	private void makeAlarms(Dish dish, DishFoodLog lastDishFoodLog, Double foodWeight) {

		// 좋아요한 냥그릇의 사료량이 일정량 이하가 된 경우 유저 알람
		if (lastDishFoodLog.getFoodWeight() >= IotConstants.WARNING_WEIGHT
			&& foodWeight <= IotConstants.WARNING_WEIGHT) {
			alarmAddService.addAlarm(AlarmType.USER_LIKE_DISH_LOW_FOOD, dish.getId(), null, dish.getDishImg(), null,
				dish.getDishName());
		}

		// 이전에 생성된 로그 시간과 현재 시간 차이
		long diff = Duration.between(lastDishFoodLog.getCreatedDate(), LocalDateTime.now()).toHours();

		// 좋아요한 냥그릇의 무게가 일정량 이하로 일정기간 유지된 상태에서 고양이가 방문하여 사진이 찍힌 경우 사용자 알람
		if (foodWeight <= IotConstants.WARNING_WEIGHT && diff >= IotConstants.MAX_HOUR_NO_CHANGE_WEIGHT_BUT_PICTURE) {

			// 최근 로그 변경시간 이후 방문한 고양이가 찍힌 사진이 있는 경우 알람을 생성한다.
			List<IoTCatImg> ioTCatImgList = pictureIoTCatImgRepository.findIoTCatImgByDish_IdAndCreatedDateAfter(
				dish.getId(), lastDishFoodLog.getCreatedDate());

			for(IoTCatImg ioTCatImg : ioTCatImgList) {
				ioTCatImg.setIsHungryOn();

				pictureIoTCatImgRepository.save(ioTCatImg);
			}

			if (ioTCatImgList.size() > 0) {
				Collections.shuffle(ioTCatImgList);

				alarmAddService.addAlarm(AlarmType.USER_LIKE_DISH_HUNGRY_CAT, dish.getId(), null,
					ioTCatImgList.get(0).getImgUrl(), null, dish.getDishName());
			}
		}

		// 사료 로그가 등록된지 일주일이 지났으면 새로운 로그를 하나 생성하고 알람을 보낸다.
		if (diff >= IotConstants.MAX_HOUR_NO_CHANGE_WEIGHT) {
			DishFoodLog dishFoodLog = DishFoodLog.builder().dish(dish).foodWeight(foodWeight).build();
			dishFoodLogRepository.save(dishFoodLog);

			alarmAddService.addAlarm(AlarmType.ADMIN_DISH_DATA_NO_CHANGE, dish.getId(), dish.getAdminGroup().getId(),
				dish.getDishImg(), null, dish.getDishName());
		}

		// 일주일동안 냥그릇에 찍힌 고양이 IoT 사진이 없다면
		LocalDateTime aWeekAgo = LocalDateTime.now().minusDays(7);
		if (!pictureIoTCatImgRepository.existsIoTCatImgByDish_IdAndCreatedDateAfter(dish.getId(), aWeekAgo)) {

			alarmAddService.addAlarm(AlarmType.ADMIN_DISH_NO_PICTURE, dish.getId(), dish.getAdminGroup().getId(),
				dish.getDishImg(), null, dish.getDishName());
		}
	}
}
