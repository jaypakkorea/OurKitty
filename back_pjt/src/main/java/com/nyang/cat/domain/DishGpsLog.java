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
public class DishGpsLog extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "dish_gps_log_id")
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "dish_id")
	private Dish dish;

	@Column(name = "before_lat")
	private Double beforeLat;

	@Column(name = "before_lon")
	private Double beforeLon;

	@Column(name = "after_lat")
	private Double afterLat;

	@Column(name = "after_lon")
	private Double afterLon;

}
