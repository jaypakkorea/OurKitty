package com.nyang.cat.dev.communities.service.user;

import com.nyang.cat.dev.communities.dto.user.UserCommunityCommentAddDto;
import com.nyang.cat.dev.communities.dto.user.UserCommunityCommentDto;
import com.nyang.cat.dev.communities.dto.user.UserCommunityCommentModifyDto;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

public interface UserCommunityCommentService {

	public UserCommunityCommentDto communityCommentAdd(Long communityId, String token,
		UserCommunityCommentAddDto userCommunityCommentAddDto);

	public void communityCommentModify(Long commentId, UserCommunityCommentModifyDto userCommunityCommentModifyDto);

	public void communityCommentDelete(Long commentId, String token);

	public Slice<UserCommunityCommentDto> communityCommentList(Pageable pageable, Long communityId, String token);
}
