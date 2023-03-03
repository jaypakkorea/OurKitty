package com.nyang.cat.domain.notice;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;

import com.nyang.cat.domain.User;
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
public class NoticeComment extends BaseEntity {

	@Id
	@GeneratedValue
	@Column(name = "notice_comment_id")
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id", nullable = false)
	private User user;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "notice_id", nullable = false)
	private Notice notice;

	@Lob
	@Column(name = "content", nullable = false, length = 100)
	private String content;

	@Column(name = "state", nullable = false)
	private Integer state;

	@PrePersist
	public void prePersist() {
		this.state = this.state == null ? 0 : this.state;
	}

	public void deleteNoticeComment() {
		this.state = 1;
	}
}
