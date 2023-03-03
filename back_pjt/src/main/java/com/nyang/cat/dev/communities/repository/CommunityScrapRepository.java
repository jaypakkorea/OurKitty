package com.nyang.cat.dev.communities.repository;

import java.util.List;
import java.util.Optional;

import com.nyang.cat.domain.*;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CommunityScrapRepository extends JpaRepository<CommunityScrap, Long> {

	Optional<CommunityScrap> findByCommunityAndUser(Community community, User user);

	boolean existsByCommunityAndUserAndCommunityScrapState(Community community, User user, Integer state);

	@Query("select c from CommunityScrap c where c.communityScrapState = 0 and c.community.communityState = 0 and c.user =:user")
	Slice<CommunityScrap> findSliceByUser(Pageable pageable, User user);

	@Query("select c from CommunityScrap c where c.communityScrapState = 0 and c.community =:community")
	List<CommunityScrap> findByCommunity(Community community);
}
