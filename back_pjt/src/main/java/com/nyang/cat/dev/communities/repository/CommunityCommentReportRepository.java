package com.nyang.cat.dev.communities.repository;

import com.nyang.cat.domain.CommunityComment;
import com.nyang.cat.domain.CommunityCommentLike;
import com.nyang.cat.domain.CommunityCommentReport;
import com.nyang.cat.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CommunityCommentReportRepository extends JpaRepository<CommunityCommentReport, Long> {

    Optional<CommunityCommentReport> findByCommunityCommentAndUser(CommunityComment communityComment, User user);

    boolean existsByCommunityCommentAndUser(CommunityComment communityComment, User user);

}
