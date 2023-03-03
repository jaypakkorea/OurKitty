package com.nyang.cat.dev.util.converter;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

import com.nyang.cat.dev.notice.dto.NoticeCommentDto;
import com.nyang.cat.dev.notice.dto.NoticeDto;
import com.nyang.cat.domain.User;
import com.nyang.cat.domain.notice.Notice;
import com.nyang.cat.domain.notice.NoticeComment;
import com.nyang.cat.domain.notice.NoticeImg;

public class NoticeConverter {

	public static NoticeDto noticeConvertToDto(Notice notice, List<NoticeImg> imgList, Boolean isLike) {

		return NoticeDto.builder()
			.noticeId(notice.getId())
			.adminName(notice.getAdmin().getAdminName())
			.adminGroupName(notice.getAdmin().getGroup().getGroupName())
			.content(notice.getContent())
			.likeCount(notice.getLikeCount())
			.commentCount(notice.getCommentCount())
			.isLike(isLike)
			.noticeImgs(imgList.stream().map(NoticeImg::getImgUrl).collect(Collectors.toUnmodifiableList()))
			.createdAt(notice.getCreatedDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")))
			.build();

	}

	public static NoticeCommentDto noticeCommentConvertToDto(NoticeComment noticeComment, Boolean isUser) {
		User user = noticeComment.getUser();

		return NoticeCommentDto.builder()
			.commentId(noticeComment.getId())
			.userName(user.getNickName())
			.userImg(user.getProfileImageUrl())
			.content(noticeComment.getContent())
			.isUser(isUser)
			.createdAt(noticeComment.getCreatedDate())
			.build();
	}
}
