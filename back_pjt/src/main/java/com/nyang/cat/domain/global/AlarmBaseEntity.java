package com.nyang.cat.domain.global;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import javax.persistence.PrePersist;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import lombok.Getter;

@EntityListeners(AuditingEntityListener.class)
@MappedSuperclass
@Getter
public class AlarmBaseEntity extends BaseEntity {

	@Column(name = "content")
	protected String content;

	@Column(name = "state")
	protected Integer state;

	@Column(name = "img_url")
	protected String imgUrl;

	@Column(name = "target_url")
	protected String targetUrl;

	@Column(name = "alarm_code")
	protected Integer alarmCode;

	@PrePersist
	public void prePersist() {
		this.state = this.state == null ? 0 : this.state;
	}
}
