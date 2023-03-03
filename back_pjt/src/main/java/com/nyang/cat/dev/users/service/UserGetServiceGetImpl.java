package com.nyang.cat.dev.users.service;

import com.nyang.cat.dev.communities.dto.user.UserCommunityDetailDto;
import com.nyang.cat.dev.communities.repository.CommunityRepository;
import com.nyang.cat.dev.communities.service.common.CommunityMethod;
import com.nyang.cat.dev.dishes.dto.DishDto;
import com.nyang.cat.dev.dishes.repository.DishLikeRepository;
import com.nyang.cat.dev.dishes.service.common.DishMethod;
import com.nyang.cat.dev.pictures.dto.PictureDto;
import com.nyang.cat.dev.pictures.repository.PictureIoTCatImgLikeRepository;
import com.nyang.cat.dev.pictures.service.common.PicturesMethod;
import com.nyang.cat.dev.users.dto.UserProfile;
import com.nyang.cat.dev.users.service.common.UserMethod;
import com.nyang.cat.dev.util.converter.DishConverter;
import com.nyang.cat.domain.Community;
import com.nyang.cat.domain.Dish;
import com.nyang.cat.domain.DishFoodLog;
import com.nyang.cat.domain.DishLike;
import com.nyang.cat.domain.IoTCatImg;
import com.nyang.cat.domain.IoTCatImgLike;
import com.nyang.cat.domain.User;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class UserGetServiceGetImpl implements UserGetService {

    private final CommunityRepository communityRepository;
    private final PictureIoTCatImgLikeRepository pictureIoTCatImgLikeRepository;
    private final DishLikeRepository dishLikeRepository;

    private final CommunityMethod communityMethod;
    private final UserMethod userMethod;
    private final DishMethod dishMethod;

    private final PicturesMethod picturesMethod;

    @Override
    public UserProfile getUserProfile(Pageable pageable, String token, Long id) {

        // 권환 확인 및 유저 정보를 가져오기
        User user = userMethod.getTokenUser(token, false);
        User findUser = userMethod.getIdUser(id);

        // 현재 유저인가?
        Boolean isUser = findUser.equals(user);


        return UserProfile.builder()
            .id(findUser.getId())
            .profileImg(findUser.getProfileImageUrl())
            .nickName(findUser.getNickName())
            .isUser(isUser)
            .build();
    }

    @Override
    public Slice<UserCommunityDetailDto> getCommunityList(Pageable pageable, String token, Long id) {

        // 유저 정보를 가져오기
        User profileUser = userMethod.getIdUser(id);

        Slice<Community> communityUser = communityMethod.getCommunityUser(pageable, profileUser);
        return communityUser.map(communityMethod.getConverter(profileUser));
    }

    @Override
    public Integer getCommunityListCount(String token, Long id) {
        User profileUser = userMethod.getIdUser(id);

        return communityMethod.getCommunityUserCount(profileUser);
    }

    @Override
    public Slice<PictureDto> getPictureList(Pageable pageable, String token, Long id) {

        // 유저 정보를 가져오기
        User profileUser = userMethod.getIdUser(id);
        User user = userMethod.getTokenUser(token, false);

        // 좋아요 누른 IOT 사진들
        Slice<IoTCatImgLike> imgLikeSlice = pictureIoTCatImgLikeRepository.findSliceByUserAndState(pageable,
            profileUser, 0);

        return imgLikeSlice.map(ioTCatImgLike -> {
            IoTCatImg ioTCatImg = ioTCatImgLike.getIoTCatImg();
            Boolean isLike = picturesMethod.isPictureLike(user, ioTCatImgLike.getIoTCatImg());

            return new PictureDto(ioTCatImg, isLike);
        });
    }

    @Override
    public Slice<DishDto> getDishList(Pageable pageable, String token, Long id) {

        // 유저 정보를 가져오기
        User user = userMethod.getIdUser(id);
        Slice<DishLike> sliceByUser = dishLikeRepository.findSliceByUserAndDish_DishState(user, 1);
        return sliceByUser.map(dishLike -> {
            Dish dish = dishLike.getDish();
            DishFoodLog dishFoodLog = dishMethod.getDishFoodLog(dishLike.getDish());
            return DishConverter.DishDto(dish, dishFoodLog);
        });
    }
}
