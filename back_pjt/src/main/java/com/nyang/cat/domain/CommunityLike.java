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
public class CommunityLike extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "community_like_id")
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_account_id", nullable = false)
	private User user;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "community_id", nullable = false)
	private Community community;

	@Column(name = "community_like_state", nullable = false)
	private Integer communityLikeState;

	@PrePersist
	public void prePersist() {
		this.communityLikeState = this.communityLikeState == null ? 0 : this.communityLikeState;
	}

	public void setCommunityLikeStateOff() {
		this.communityLikeState = 1;
	}

	public void setCommunityLikeStateOn() {
		this.communityLikeState = 0;
	}

}
