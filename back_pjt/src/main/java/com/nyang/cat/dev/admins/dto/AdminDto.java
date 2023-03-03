package com.nyang.cat.dev.admins.dto;

import com.nyang.cat.domain.Admin;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class AdminDto {

	private long id;

	private String adminEmail;

	private Long groupId;

	private String groupName;

	private String adminName;

	private String adminPhone;

	private String adminRole;

	private Integer adminState;

}
