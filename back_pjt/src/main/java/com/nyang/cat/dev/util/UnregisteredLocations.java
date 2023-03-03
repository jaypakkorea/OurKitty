package com.nyang.cat.dev.util;

import java.util.HashMap;
import java.util.Map;

import com.nyang.cat.dev.dishes.dto.LocationDto;

import lombok.AllArgsConstructor;

public class UnregisteredLocations {

	private final static Map<String, LocationDto> locations = new HashMap<>();

	public static void addLocation(String serialNumber, Double lat, Double lon) {
		locations.put(serialNumber, LocationDto.builder().lat(lat).lon(lon).build());
	}

	public static void deleteLocation(String serialNumber) {
		locations.remove(serialNumber);
	}

	public static LocationDto getLocation(String serialNumber) {
		return locations.getOrDefault(serialNumber, null);
	}
}
