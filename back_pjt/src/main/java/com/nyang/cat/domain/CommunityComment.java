package com.nyang.cat.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;

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
@Entity
public class CommunityComment extends BaseEntity {

	@Id
	@GeneratedValue
	@Column(name = "comment_id")
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_account_id", nullable = false)
	private User user;


	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "community_id", nullable = false)
	private Community community;

	@Lob
	@Column(name = "content", nullable = false, length = 100)
	private String content;

	@Column(name = "like_count", nullable = false)
	private Integer likeCount;

	@Column(name = "state", nullable = false)
	private Integer state;

	@PrePersist
	public void prePersist() {
		this.likeCount = this.likeCount == null ? 0 : this.likeCount;
		this.state = this.state == null ? 0 : this.state;
	}

	public void setContentModify(String content) {
		this.content = content;
	}

	public void setCommunityCommentStateOff() {
		this.state = 1;
	}

	public void setCommunityCommentLikeCountPlus() {
		this.likeCount++;
	}

	public void setCommunityCommentLikeCountMinus() {
		this.likeCount--;
	}

}
