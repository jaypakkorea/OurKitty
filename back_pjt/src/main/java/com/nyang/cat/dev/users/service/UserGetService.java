package com.nyang.cat.dev.users.service;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

import com.nyang.cat.dev.communities.dto.user.UserCommunityDetailDto;
import com.nyang.cat.dev.dishes.dto.DishDto;
import com.nyang.cat.dev.pictures.dto.PictureDto;
import com.nyang.cat.dev.users.dto.UserProfile;

public interface UserGetService {
    UserProfile getUserProfile(Pageable pageable, String token, Long id);

    Slice<UserCommunityDetailDto> getCommunityList(Pageable pageable, String token, Long id);

    Integer getCommunityListCount(String token, Long id);

    Slice<PictureDto> getPictureList(Pageable pageable, String token, Long id);

    Slice<DishDto> getDishList(Pageable pageable, String token, Long id);

}
