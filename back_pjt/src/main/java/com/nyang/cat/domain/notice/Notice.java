package com.nyang.cat.domain.notice;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.OneToOne;
import javax.persistence.PrePersist;

import com.nyang.cat.domain.Admin;
import com.nyang.cat.domain.global.BaseEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
public class Notice extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "notice_id")
	private Long id;

	@ToString.Exclude
	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "admin_id", nullable = false)
	private Admin admin;

	@Lob
	@Column(name = "content", nullable = false, length = 500)
	private String content;

	@Column(name = "like_count", nullable = false)
	private Integer likeCount;

	@Column(name = "comment_count", nullable = false)
	private Integer commentCount;

	@Column(name = "state", nullable = false)
	private Integer state;

	@PrePersist
	public void prePersist() {
		this.likeCount = this.likeCount == null ? 0 : this.likeCount;
		this.commentCount = this.commentCount == null ? 0 : this.commentCount;
		this.state = this.state == null ? 0 : this.state;
	}

	public void modifyNotice(String content) {
		this.content = content;
	}

	public void deleteNotice() {
		this.state = 1;
	}

	public void handleLike(boolean isPlus) {
		this.likeCount = isPlus ? this.likeCount + 1 : this.likeCount - 1;
	}

	public void handleComment(boolean isPlus) {
		this.commentCount = isPlus ? this.commentCount + 1 : this.commentCount - 1;
	}
}
