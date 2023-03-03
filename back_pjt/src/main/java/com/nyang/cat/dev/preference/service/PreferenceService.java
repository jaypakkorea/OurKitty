package com.nyang.cat.dev.preference.service;

import java.util.List;

import com.nyang.cat.dev.preference.dto.PreferenceDto;

public interface PreferenceService {

	void addPreference(PreferenceDto preferenceDto, String token);
	PreferenceDto findPreference(Long dishId, String token);
	List<PreferenceDto> findPreferences(Long dishId, String token);
	List<PreferenceDto> findAdminAllPreferences(String token);
}
