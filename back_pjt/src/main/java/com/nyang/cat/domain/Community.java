package com.nyang.cat.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
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
@ToString
@Entity
public class Community extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "community_id")
	private Long id;

	@ToString.Exclude
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "category_id", nullable = false)
	private CommunityCategory communityCategory;

	@ToString.Exclude
	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_account_id", nullable = false)
	private User user;

	@ToString.Exclude
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "dish_id")
	private Dish dish;

	@Lob
	@Column(name = "content", nullable = false, length = 500)
	private String content;

	@Column(name = "like_count", nullable = false)
	private Integer likeCount;

	@Column(name = "scrap_count", nullable = false)
	private Integer scrapCount;

	@Column(name = "comment_count", nullable = false)
	private Integer commentCount;

	@Column(name = "report_count", nullable = false)
	private Integer reportsCount;

	@Column(name = "community_state", nullable = false)
	private Integer communityState;

	@PrePersist
	public void prePersist() {
		this.likeCount = this.likeCount == null ? 0 : this.likeCount;
		this.scrapCount = this.scrapCount == null ? 0 : this.scrapCount;
		this.commentCount = this.commentCount == null ? 0 : this.commentCount;
		this.reportsCount = this.reportsCount == null ? 0 : this.reportsCount;
		this.communityState = this.communityState == null ? 0 : this.communityState;
	}

	public void setCommunityModify(Dish dish, CommunityCategory communityCategory, String content) {
		this.content = content;
	}

	public void setCommunityStateOff() { this.communityState = 1; }

	public void setCommunityStateOn() { this.communityState=0; }

	public void blockCommunity() { this.communityState = 2; }


	public void setCommunityLikeCountPlus() {
		this.likeCount++;
	}

	public void setCommunityLikeCountMinus() {
		this.likeCount--;
	}

	public void setCommunityReportCountPlus() {
		this.reportsCount++;
	}

	public void setCommunityCommentCountPlus() {
		this.commentCount++;
	}

	public void setCommunityCommentCountMinus() {
		this.commentCount--;
	}
}
