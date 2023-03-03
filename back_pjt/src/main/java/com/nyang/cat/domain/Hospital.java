package com.nyang.cat.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.nyang.cat.domain.global.BaseEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Hospital extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "hospital_id")
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "group_id")
	private AdminGroup group;

	@Column(name = "hospital_name")
	private String hospitalName;

	@Column(name = "address")
	private String address;

	@Column(name = "lat")
	private double lat;

	@Column(name = "lon")
	private double lon;

	@Column(name = "hospital_phone")
	private String hospitalPhone;

	@Column(name = "hospital_state")
	private int hospitalState;

}
