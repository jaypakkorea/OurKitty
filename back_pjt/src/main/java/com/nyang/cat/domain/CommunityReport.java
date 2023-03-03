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
public class CommunityReport extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "community_report_id")
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "community_id", nullable = false)
	private Community community;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_account_id", nullable = false)
	private User user;

	@Column(name = "reports_content", nullable = false)
	private String reportsContent;

	@Column(name = "dish_id")
	private Long dishId;

	@Column(name = "community_report_state", nullable = false)
	private Integer communityReportState;


	@PrePersist
	public void prePersist() {
		this.communityReportState = this.communityReportState == null ? 0 : this.communityReportState;
	}

	public void setCommunityReportStateOn() {
		this.communityReportState = 1;
	}

	public void setCommunityReportStateOff() {
		this.communityReportState = 0;
	}

}
