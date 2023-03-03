package com.nyang.cat.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PrePersist;

import com.nyang.cat.domain.global.BaseEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class User extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false)
	private Long id;

	@Column(name = "account_id", nullable = false)
	private String accountId;

	@Column(name = "provider", nullable = false)
	private String provider;

	@Column(name = "profile_image_url")
	private String profileImageUrl;

	@Column(name = "nick_name")
	private String nickName;

	@Column(name = "user_state")
	private Integer userState;

	@Column(name = "is_agree_location_provision")
	private Boolean isAgreeLocationProvision;

	@PrePersist
	public void prePersist() {
		this.userState = this.userState == null ? 0 : this.userState;
	}

	public void changeProfileImage(String profileImageUrl) {
		this.profileImageUrl = profileImageUrl;
	}

	public void changeNickName(String nickName) {
		this.nickName = nickName;
	}

	public void changeAgreeLocationProvision() {
		this.isAgreeLocationProvision = !this.isAgreeLocationProvision;
	}
}