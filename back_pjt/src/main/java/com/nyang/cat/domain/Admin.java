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
public class Admin extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false)
	private Long id;

	@Column(name = "admin_email", unique = true)
	private String adminEmail;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "group_id")
	private AdminGroup group;

	@Column(name = "admin_password")
	private String adminPassword;

	@Column(name = "admin_name")
	private String adminName;

	@Column(name = "admin_phone")
	private String adminPhone;

	@Column(name = "admin_role")
	private String adminRole;

	@Column(name = "admin_state")
	private Integer adminState;

	@PrePersist
	public void prePersist() {
		this.adminState = this.adminState == null ? -1 : this.adminState;
	}

	public void modify(String adminName, String adminPhone, String adminRole) {
		this.adminName = adminName;
		this.adminPhone = adminPhone;
		this.adminRole = adminRole;
	}
}
