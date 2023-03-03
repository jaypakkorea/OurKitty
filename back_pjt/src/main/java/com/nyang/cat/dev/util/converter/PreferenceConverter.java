package com.nyang.cat.dev.util.converter;

import com.nyang.cat.dev.preference.dto.PreferenceDto;
import com.nyang.cat.domain.Preference;

public class PreferenceConverter {

	/**
	 * 선호도 결과 Entity 를 DTO 로 변환
	 * @param preference	변환할 Entity
	 * @return				변환 결과 DTO
	 */
	public static PreferenceDto preferenceConvertToDto(Preference preference) {
		return PreferenceDto.builder()
			.preferenceId(preference.getId())
			.userId(preference.getUser().getId())
			.userName(preference.getUser().getNickName())
			.dishId(preference.getDish().getId())
			.dishName(preference.getDish().getDishName())
			.preferenceResult(preference.getPreferenceResult())
			.reason(preference.getReason())
			.writingDate(preference.getCreatedDate())
			.updatingDate(preference.getLastModifiedDate())
			.build();
	}
}
