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
public class IoTCatImg extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "iot_cat_img")
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "dish_id", nullable = false)
	private Dish dish;

	@Column(name = "img_url")
	private String imgUrl;

	@Column(name = "is_hungry")
	private Boolean isHungry;

	public void update(String imgUrl, Dish dish) {
		this.imgUrl = imgUrl;
		this.dish = dish;
	}

	@PrePersist
	public void prePersist() {
		this.isHungry = this.isHungry != null && this.isHungry;
	}

	public void setIsHungryOn() {
		this.isHungry = true;
	}

}
