package com.nyang.cat.dev.communities.repository;

import java.util.List;
import java.util.Optional;

import com.nyang.cat.domain.CommunityScrap;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;

import com.nyang.cat.domain.CommunityComment;
import com.nyang.cat.domain.Community;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CommunityCommentRepository extends JpaRepository<CommunityComment, Long> {

	@Query("select c from CommunityComment c where c.state = 0 and c.id = :id")
	Optional<CommunityComment> findStateOnById(@Param("id") long id);

	@Query("select c from CommunityComment c where c.state = 0 and c.community =:community")
	Slice<CommunityComment> findPageByAndCommunity(Pageable pageable, Community community);

	@Query("select c from CommunityComment c where c.state = 0 and c.community =:community")
	List<CommunityComment> findByCommunity(Community community);
}
