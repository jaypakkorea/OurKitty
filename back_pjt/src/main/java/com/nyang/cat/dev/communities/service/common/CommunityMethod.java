package com.nyang.cat.dev.communities.service.common;

import com.nyang.cat.dev.communities.dto.user.UserCommunityDetailDto;
import com.nyang.cat.dev.communities.repository.*;
import com.nyang.cat.dev.users.dto.UserDto;
import com.nyang.cat.dev.users.repository.UserRepository;
import com.nyang.cat.dev.users.service.UserAuthService;
import com.nyang.cat.dev.util.S3Uploader;
import com.nyang.cat.domain.Community;
import com.nyang.cat.domain.CommunityCategory;
import com.nyang.cat.domain.CommunityImg;
import com.nyang.cat.domain.User;
import com.nyang.cat.exception.common.CustomException;
import com.nyang.cat.exception.constants.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

@Component
@Transactional
@Slf4j
@RequiredArgsConstructor
public class CommunityMethod {

    private final CommunityRepository communityRepository;
    private final CommunityCategoryRepository communityCategoryRepository;
    private final CommunityImgRepository communityImgRepository;

    private final CommunityLikeRepository communityLikeRepository;
    private final CommunityScrapRepository communityScrapRepository;
    private final UserRepository userRepository;
    private final UserAuthService userAuthService;

    private final S3Uploader s3Uploader;


    /**
     * 커뮤니티 카테고리 조회
     *
     * @param communityCategoryId 카테고리 ID
     * @return 카테고리
     */
    public CommunityCategory getCommunityCategory(Long communityCategoryId) {
        // 카테고리 조회
        CommunityCategory category = communityCategoryRepository.findById(communityCategoryId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_ENTITY));
        return category;
    }


    /**
     * 커뮤니티 조회
     *
     * @param id 커뮤니티 ID
     * @return 커뮤니티 조회 결과
     */
    public Community getCommunity(Long id) {
        return communityRepository.findStateOnById(id)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_ENTITY));
    }

    public Integer getCommunityUserCount(User user){
        return communityRepository.countByUserAndCommunityState(user, 0);
    }

    /**
     * 로그인 유저가 작성한 페이지 목록조회
     * @param pageable 정렬목록
     * @param user 유저
     * @return 작성 커뮤니티 리스트
     */
    public Slice<Community> getCommunityUser(Pageable pageable, User user){
        return communityRepository.findSliceByUser(pageable, user);
    }


    /**
     * 커뮤니티 이미지 삭제
     *
     * @param communityImgs 커뮤니티 이미지 목록
     * @throws IOException 파일업로드 예외
     */
    public void deleteImages(List<CommunityImg> communityImgs) throws IOException {
        for (CommunityImg img : communityImgs) {
            s3Uploader.deleteFile(img.getImgUrl());
        }
    }


    /**
     * 유저 조회
     *
     * @param token 유저 토큰
     * @return 유저
     */
    public User getUser(String token, Boolean isRequired) {

        log.info("token : {}", token);

        UserDto userDto = userAuthService.findUser(token, isRequired);

        log.info("userDto : {}", userDto);

        if (userDto == null && !isRequired) {
            return null;
        } else if (userDto == null) {
            throw new CustomException(ErrorCode.NO_AUTHORITY);
        } else {
            return userRepository.findById(userDto.getId())
                    .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_ENTITY));
        }
    }


    /**
     * 커뮤니티 목록변환
     *
     * @return CommunityDetailDto
     */
    public Function<Community, UserCommunityDetailDto> getConverter(User user) {
        return community -> {

            // 이미지 List<String> 변환
            List<String> communityImgs = communityImgRepository.findByCommunity(community)
                    .stream()
                    .map(CommunityImg::getImgUrl)
                    .collect(Collectors.toList());

            // dish null 체크
            Long dishId = null;
            String dishName = null;

            if (community.getDish() != null) {
                dishId = community.getDish().getId();
                dishName = community.getDish().getDishName();
            }

            // 커뮤니티 좋아요 여부 확인
            boolean isLike = communityLikeRepository.existsByCommunityAndUserAndCommunityLikeState(community,
                    user, 0);

            // 커뮤니티 스크랩 여부 확인
            boolean isScrap = communityScrapRepository.existsByCommunityAndUserAndCommunityScrapState(community,
                    user, 0);

            // 작성 유저인지 확인
            // boolean isUser = community.getUser().getId().equals(user.getId());
            boolean isUser = user == null;

            // 커뮤니티 CommunityDetailDto 변환
            return UserCommunityDetailDto.builder()
                    .communityId(community.getId())
                    .content(community.getContent())
                    .userName(community.getUser().getNickName())
                    .likeCount(community.getLikeCount())
                    .commentCount(community.getCommentCount())
                    .reportsCount(community.getReportsCount())
                    .dishId(dishId)
                    .dishName(dishName)
                    .isLike(isLike)
                    .isScrap(isScrap)
                    .isUser(isUser)
                    .communityImgs(communityImgs)
                    .createdAt(community.getCreatedDate())
                    .modifiedAt(community.getLastModifiedDate())
                    .build();
        };
    }
}
