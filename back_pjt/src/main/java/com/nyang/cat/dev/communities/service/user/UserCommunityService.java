package com.nyang.cat.dev.communities.service.user;

import java.io.IOException;

import com.nyang.cat.dev.communities.dto.user.UserCommunityRequestDto;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

import com.nyang.cat.dev.communities.dto.user.UserCommunityDetailDto;

public interface UserCommunityService {

	public void userCommunityUserAdd(UserCommunityRequestDto communityCommentAddRequest,String token) throws IOException;

	public void userCommunityUserModify(Long id, UserCommunityRequestDto userCommunityRequestDto, String token) throws IOException;

	public void userCommunityDelete(Long id, String token) throws IOException;

	public UserCommunityDetailDto userCommunityDetails(Long id, String token);

	public Slice<UserCommunityDetailDto> userCommunityList(Pageable pageable, String token, Long tagId);

	public Slice<UserCommunityDetailDto> userCommunityDishList(Pageable pageable, Long dishId, String token, Long tagId);

	public Slice<UserCommunityDetailDto> userCommunityScrapList(Pageable pageable, String token);

	public Slice<UserCommunityDetailDto> userCommunityUserList(Pageable pageable, String token);

}
