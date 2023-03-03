package com.nyang.cat.dev.communities.service.user;

import com.nyang.cat.dev.communities.repository.CommunityCommentLikeRepository;
import com.nyang.cat.dev.communities.repository.CommunityCommentReportRepository;
import com.nyang.cat.dev.communities.service.common.CommunityCommentMethod;
import com.nyang.cat.dev.communities.service.common.CommunityMethod;
import com.nyang.cat.domain.*;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class UserCommunityCommentActionServiceImpl implements UserCommunityCommentActionService {

    private final CommunityCommentLikeRepository communityCommentLikeRepository;
    private final CommunityCommentReportRepository communityCommentReportRepository;

    private final CommunityMethod communityMethod;
    private final CommunityCommentMethod communityCommentMethod;


    @Override
    public void communityCommentLike(Long communityCommentId, String token) {
        log.debug("communityCommentLike Start");
        communityCommentLike(communityCommentMethod.getCommunityComment(communityCommentId), token);
        log.debug("communityCommentLike End");
    }


    /**
     * 댓글 좋아요 클릭
     *
     * @param communityComment 댓글
     */
    private void communityCommentLike(CommunityComment communityComment, String token) {
        // 유저 조회
        User user = communityMethod.getUser(token, true);

        // 유저가 해당 댓글에 좋아요를 클릭했는지 확인
        Optional<CommunityCommentLike> communityCommentLikeFind = communityCommentLikeRepository.findByCommunityCommentAndUser(communityComment, user);

        // 클릭한적이 없는경우
        if (communityCommentLikeFind.isEmpty()) {
            // 댓글을 communityCommentLikeRepository 추가
            CommunityCommentLike communityCommentLike = CommunityCommentLike.builder()
                    .communityComment(communityComment)
                    .user(user)
                    .build();
            communityCommentLikeRepository.save(communityCommentLike);

            // 댓글 좋아요 +1
            communityComment.setCommunityCommentLikeCountPlus();
        }

        // 이미 한번 이상 클릭한 경우
        else {
            CommunityCommentLike communityCommentLike = communityCommentLikeFind.get();

            // 좋아요가 되어있는 상태
            if (communityCommentLike.getCommunityCommentLikeState() == 0) {
                // 좋아요 개수 -1, communityCommentLikeRepository에서 비활성화
                communityCommentLike.setCommunityCommentLikeStateOff();
                communityComment.setCommunityCommentLikeCountMinus();
            }

            // 좋아요가 되어있지 않은 상태
            else {
                // 좋아요 개수 +1, communityCommentLikeRepository에서 활성화
                communityCommentLike.setCommunityCommentLikeStateOn();
                communityComment.setCommunityCommentLikeCountPlus();
            }
        }
    }

}
