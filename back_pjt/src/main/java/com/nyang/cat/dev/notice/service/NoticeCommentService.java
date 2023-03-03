package com.nyang.cat.dev.notice.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

import com.nyang.cat.dev.notice.dto.NoticeCommentDto;

public interface NoticeCommentService {

	Slice<NoticeCommentDto> findNoticeComments(Pageable pageable, Long noticeId, String token);

	NoticeCommentDto addNoticeComment(String token, NoticeCommentDto noticeCommentDto, Long noticeId);

	void removeNoticeComment(String token, Long commentId);
}
