package com.nyang.cat.dev.communities.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.nyang.cat.domain.Community;
import com.nyang.cat.domain.CommunityLike;
import com.nyang.cat.domain.CommunityReport;
import com.nyang.cat.domain.User;

public interface CommunityReportRepository extends JpaRepository<CommunityReport, Long> {

	Optional<CommunityReport> findByCommunityAndUser(Community community, User user);

	boolean existsByCommunityAndUserAndCommunityReportState(Community community, User user, Integer state);

	@Query("select c from CommunityReport c where c.communityReportState = 0 and c.community =:community")
	List<CommunityReport> findByCommunity(Community community);

	//List<CommunityReport> findCommunityReportByCommunity(Community community);

}
