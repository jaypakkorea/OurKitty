package com.nyang.cat.dev.communities.repository;

import java.util.List;
import java.util.Optional;

import com.nyang.cat.domain.Community;
import com.nyang.cat.domain.CommunityCategory;
import com.nyang.cat.domain.CommunityImg;
import com.nyang.cat.domain.CommunityLike;
import com.nyang.cat.domain.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CommunityLikeRepository extends JpaRepository<CommunityLike, Long> {

	Optional<CommunityLike> findByCommunityAndUser(Community community, User user);

	boolean existsByCommunityAndUserAndCommunityLikeState(Community community, User user, Integer state);

	@Query("select c from CommunityLike c where c.communityLikeState = 0 and c.community =:community")
	List<CommunityLike> findByCommunity(Community community);
}
