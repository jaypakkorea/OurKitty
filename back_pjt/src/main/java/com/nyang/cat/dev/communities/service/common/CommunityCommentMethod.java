package com.nyang.cat.dev.communities.service.common;

import com.nyang.cat.dev.alarms.service.AlarmAddService;
import com.nyang.cat.dev.communities.repository.*;
import com.nyang.cat.dev.users.repository.UserRepository;
import com.nyang.cat.dev.users.service.UserAuthService;
import com.nyang.cat.domain.CommunityComment;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;

@Component
@Transactional
@Slf4j
@RequiredArgsConstructor
public class CommunityCommentMethod {

    private final CommunityCommentRepository communityCommentRepository;


    /**
     * 커뮤니티 댓글 조회
     * @param communityCommentId 댓글 ID
     * @return 댓글
     */
    public CommunityComment getCommunityComment(Long communityCommentId) {
        return communityCommentRepository.findStateOnById(communityCommentId).orElseThrow(RuntimeException::new);
    }
}
