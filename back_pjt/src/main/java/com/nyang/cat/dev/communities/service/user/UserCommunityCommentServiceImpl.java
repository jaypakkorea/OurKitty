package com.nyang.cat.dev.communities.service.user;

import java.util.List;

import javax.transaction.Transactional;

import com.nyang.cat.dev.communities.service.common.CommunityCommentMethod;
import com.nyang.cat.dev.communities.service.common.CommunityMethod;
import com.nyang.cat.dev.users.service.common.UserMethod;
import com.nyang.cat.domain.*;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;

import com.nyang.cat.dev.alarms.service.AlarmAddService;
import com.nyang.cat.dev.communities.dto.user.UserCommunityCommentAddDto;
import com.nyang.cat.dev.communities.dto.user.UserCommunityCommentDto;
import com.nyang.cat.dev.communities.dto.user.UserCommunityCommentModifyDto;
import com.nyang.cat.dev.communities.repository.CommunityCommentLikeRepository;
import com.nyang.cat.dev.communities.repository.CommunityCommentReportRepository;
import com.nyang.cat.dev.communities.repository.CommunityCommentRepository;
import com.nyang.cat.dev.communities.repository.CommunityImgRepository;
import com.nyang.cat.dev.util.constants.AlarmType;
import com.nyang.cat.exception.common.CustomException;
import com.nyang.cat.exception.constants.ErrorCode;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class UserCommunityCommentServiceImpl implements UserCommunityCommentService {

    private final CommunityCommentRepository communityCommentRepository;
    private final CommunityCommentLikeRepository communityCommentLikeRepository;
    private final CommunityCommentReportRepository communityCommentReportRepository;
    private final CommunityImgRepository communityImgRepository;

    private final AlarmAddService alarmAddService;

    private final CommunityMethod communityMethod;
    private final CommunityCommentMethod communityCommentMethod;
    private final UserMethod userMethod;

    /**
     * 댓글 추가
     *
     * @param communityId            커뮤니티 ID
     * @param userCommunityCommentAddDto 댓글 추가 Dto
     */
    @Override
    public UserCommunityCommentDto communityCommentAdd(Long communityId, String token,
                                                   UserCommunityCommentAddDto userCommunityCommentAddDto) {
        log.debug("communityCommentAdd Start");

        // 커뮤니티 조회
        Community findCommunity = communityMethod.getCommunity(communityId);

        // 유저 조회
        User user = communityMethod.getUser(token, true);

        // 댓글 생성
        CommunityComment communityComment = CommunityComment.builder()
                .user(user)
                .community(findCommunity)
                .content(userCommunityCommentAddDto.getContent())
                .build();
        communityCommentRepository.save(communityComment);

        // 커뮤니티 댓글개수 +1
        findCommunity.setCommunityCommentCountPlus();

        log.debug("communityCommentAdd End");

        // 커뮤니티 댓글에 대한 알람 생성
        addCommunityCommentAlarm(findCommunity, user, communityComment);

        return UserCommunityCommentDto.builder()
                .commentId(communityComment.getId())
                .userName(user.getNickName())
                .userImg(user.getProfileImageUrl())
                .content(communityComment.getContent())
                .likeCount(0)
                .isLike(false)
                .isUser(true)
                .createdAt(communityComment.getCreatedDate())
                .modifiedAt(communityComment.getLastModifiedDate())
                .build();
    }

    /**
     * 댓글 수정
     *
     * @param commentId                 댓글 ID
     * @param userCommunityCommentModifyDto 댓글 수정 Dto
     */
    @Override
    public void communityCommentModify(Long commentId, UserCommunityCommentModifyDto userCommunityCommentModifyDto) {
        log.debug("communityCommentModify Start");

        // 댓글 조회
        CommunityComment findCommunityComment = communityCommentMethod.getCommunityComment(commentId);

        // 댓글 변경사항 반영
        findCommunityComment.setContentModify(userCommunityCommentModifyDto.getContent());

        log.debug("communityCommentModify End");
    }

    /**
     * 댓글 삭제
     *
     * @param commentId 댓글 ID
     */
    @Override
    public void communityCommentDelete(Long commentId,  String token) {
        log.debug("communityCommentModify Start");

        // 댓글 조회
        CommunityComment findCommunityComment = communityCommentMethod.getCommunityComment(commentId);

        // 현재 유저 조회
        User tokenUser = userMethod.getTokenUser(token, true);

        // 현재 유저가 댓글을 작성한 유저가 아니라면
        if (!tokenUser.equals(findCommunityComment.getUser())) {
            throw new CustomException(ErrorCode.NO_AUTHORITY);
        }

        // 댓글 상태 off
        findCommunityComment.setCommunityCommentStateOff();

        // 커뮤니티 댓글개수 -1
        findCommunityComment.getCommunity().setCommunityCommentCountMinus();

        // 댓글 공감 off
        List<CommunityCommentLike> commentLikeList = communityCommentLikeRepository.findByCommunityComment(findCommunityComment);
        for (CommunityCommentLike communityCommentLike : commentLikeList) {
            communityCommentLike.setCommunityCommentLikeStateOff();
        }

        log.debug("communityCommentModify End");
    }

    /**
     * @param pageable 페이지 요청 정보
     * @return 커뮤니티 댓글 리스트
     */
    @Override
    public Slice<UserCommunityCommentDto> communityCommentList(Pageable pageable, Long communityId, String token) {
        log.debug("CommunityComment Start");

        // 유저 조회
        User user = communityMethod.getUser(token, false);

        // 커뮤니티 조회
        Community findCommunity = communityMethod.getCommunity(communityId);

        // 댓글 리스트 조회
        Slice<UserCommunityCommentDto> result = communityCommentRepository.findPageByAndCommunity(pageable, findCommunity)
                .map(communityComment -> {

                    // 유저가 해당 댓글을 공감했는가?
                    boolean isLike = communityCommentLikeRepository.existsByCommunityCommentAndUser(communityComment, user);


                    // 유저가 해당 댓글을 작성했는가?
                    User commentUser = communityComment.getUser();
                    boolean isUser = commentUser.equals(user);

                    return UserCommunityCommentDto.builder()
                            .commentId(communityComment.getId())
                            .userName(commentUser.getNickName())
                            .userImg(commentUser.getProfileImageUrl())
                            .content(communityComment.getContent())
                            .likeCount(communityComment.getLikeCount())
                            .isLike(isLike)
                            .isUser(isUser)
                            .createdAt(communityComment.getCreatedDate())
                            .modifiedAt(communityComment.getLastModifiedDate())
                            .build();
                });

        log.debug("CommunityComment End");
        return result;
    }

    /**
     * 커뮤니티 댓글 알람 생성하는 메서드
     *
     * @param community        타겟 게시글
     * @param user             댓글 작성자
     * @param communityComment 타겟 댓글
     */
    private void addCommunityCommentAlarm(Community community, User user, CommunityComment communityComment) {

        // 해당 게시글의 이미지 리스트를 불러온다.
        List<CommunityImg> imgList = communityImgRepository.findByCommunity(community);

        // 해당 게시글의 이미지가 있는 경우 첫번째 이미지, 없는 경우 null
        String imgUrl = imgList.stream()
                .findFirst()
                .map(CommunityImg::getImgUrl)
                .orElse(null);

        // 알람 추가
        alarmAddService.addAlarm(AlarmType.USER_COMMUNITY_COMMENT, community.getId(), community.getUser().getId(),
                imgUrl, user.getId(), community.getContent(), user.getNickName(),
                communityComment.getContent());
    }
}
