package com.nyang.cat.dev.preference.dto;

import java.time.LocalDateTime;

import com.nyang.cat.domain.Preference;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@Builder
@NoArgsConstructor
@ToString
public class PreferenceDto {
	private Long preferenceId;
	private Long dishId;
	private String dishName;
	private Long userId;
	private String userName;
	private int preferenceResult;
	private String reason;
	private LocalDateTime writingDate;
	private LocalDateTime updatingDate;
}
