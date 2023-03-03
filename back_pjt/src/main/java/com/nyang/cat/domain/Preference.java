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
public class Preference extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "preference_id")
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "dish_id")
	private Dish dish;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_account_id")
	private User user;

	@Column(name = "preference_result")
	private int preferenceResult;

	@Column(name = "reason")
	private String reason;

	public void modify(int preferenceResult, String reason) {
		this.preferenceResult = preferenceResult;
		this.reason = reason;
	}
}
