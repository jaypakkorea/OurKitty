package com.nyang.cat.dev.communities.repository;

import com.nyang.cat.domain.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface CommunityCommentLikeRepository extends JpaRepository<CommunityCommentLike, Long> {

    Optional<CommunityCommentLike> findByCommunityCommentAndUser(CommunityComment communityComment, User user);

    boolean existsByCommunityCommentAndUser(CommunityComment communityComment, User user);

    @Query("select c from CommunityCommentLike c where c.communityCommentLikeState = 0 and c.communityComment =:communityComment")
    List<CommunityCommentLike> findByCommunityComment(CommunityComment communityComment);
}
