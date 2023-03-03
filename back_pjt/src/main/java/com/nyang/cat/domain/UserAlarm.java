package com.nyang.cat.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.nyang.cat.domain.global.AlarmBaseEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class UserAlarm extends AlarmBaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private User user;

	@Column(name = "target_user_url")
	private String targetUserUrl;

	@Builder
	public UserAlarm(User user, String content, Integer state, String imgUrl, String targetUrl, String targetUserUrl, Integer alarmCode) {
		this.user = user;
		this.content = content;
		this.state = state;
		this.imgUrl = imgUrl;
		this.targetUrl = targetUrl;
		this.targetUserUrl = targetUserUrl;
		this.alarmCode = alarmCode;
	}

	public void check() {
		this.state = 1;
	}

	public void delete() {
		this.state = 2;
	}
}
