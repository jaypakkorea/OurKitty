package com.nyang.cat.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;

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
public class Dish extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "dish_id")
	private Long id;

	@Column(name = "serial_number", unique = true)
	private String serialNumber;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "group_id")
	private AdminGroup adminGroup;

	@Column(name = "dish_name")
	private String dishName;

	@Column(name = "other_note", length = 100)
	private String otherNote;

	@Column(name = "original_lat")
	private Double originalLat;

	@Column(name = "original_lon")
	private Double originalLon;

	@Column(name = "lat")
	private Double lat;

	@Column(name = "lon")
	private Double lon;

	@Column(name = "load_address")
	private String loadAddress;

	@Column(name = "dish_img")
	private String dishImg;

	@Column(name = "dish_state")
	private Integer dishState;

	@PrePersist
	public void prePersist() {
		this.dishState = this.dishState == null ? 0 : this.dishState;
	}

	public void update(String dishName, String otherNote) {
		this.dishName = dishName;
		this.otherNote = otherNote;
	}

	public void delete() {
		this.dishState = 2;
	}

	public void locationModify(Double lat, Double lon) {
		this.lat = lat;
		this.lon = lon;
	}

	public void originalLocationModify(Double lat, Double lon, String loadAddress) {
		this.originalLat = lat;
		this.originalLon = lon;
		this.loadAddress = loadAddress;
		this.dishState = 1;

		locationModify(lat, lon);
	}

	public void originalLocationDelete() {
		this.originalLat = null;
		this.originalLon = null;
		this.loadAddress = null;
		this.lat = null;
		this.lon = null;
		this.dishState = 0;
	}

	public void imgModify(String imgUrl) {
		this.dishImg = imgUrl;
	}
}
