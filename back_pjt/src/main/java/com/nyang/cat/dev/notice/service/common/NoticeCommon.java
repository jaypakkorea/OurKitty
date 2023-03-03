package com.nyang.cat.dev.notice.service.common;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.nyang.cat.dev.notice.repository.NoticeRepository;
import com.nyang.cat.domain.notice.Notice;
import com.nyang.cat.exception.common.CustomException;
import com.nyang.cat.exception.constants.ErrorCode;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class NoticeCommon {

	private final NoticeRepository noticeRepository;

	public Notice getNotice(Long noticeId) {
		return noticeRepository.findByIdAndState(noticeId, 0)
			.orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_ENTITY));
	}
}
