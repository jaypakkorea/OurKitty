package com.nyang.cat.dev.notice.service;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

import com.nyang.cat.dev.notice.dto.NoticeDto;
import com.nyang.cat.dev.notice.dto.NoticeRequestDto;

public interface NoticeService {

	Slice<NoticeDto> findNotices(String token, Pageable pageable);

	NoticeDto findNotice(String token, Long noticeId);

	NoticeDto addNotice(String token, NoticeRequestDto noticeRequestDto);

	NoticeDto modifyNotice(String token, Long noticeId, NoticeRequestDto noticeRequestDto);

	NoticeDto removeNotice(String token, Long noticeId);

	void modifyLike(String token, Long noticeId);

	List<NoticeDto> findNoticesByGroupId(String token);
}
