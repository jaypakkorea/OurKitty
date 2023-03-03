package com.nyang.cat.dev.notice.service;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;

import com.nyang.cat.dev.notice.dto.NoticeCommentDto;
import com.nyang.cat.dev.notice.repository.NoticeCommentRepository;
import com.nyang.cat.dev.notice.repository.NoticeRepository;
import com.nyang.cat.dev.users.dto.UserDto;
import com.nyang.cat.dev.users.repository.UserRepository;
import com.nyang.cat.dev.users.service.UserAuthService;
import com.nyang.cat.dev.util.converter.NoticeConverter;
import com.nyang.cat.domain.notice.Notice;
import com.nyang.cat.domain.notice.NoticeComment;
import com.nyang.cat.exception.common.CustomException;
import com.nyang.cat.exception.constants.ErrorCode;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class NoticeCommentServiceImpl implements NoticeCommentService {

	private final NoticeRepository noticeRepository;
	private final NoticeCommentRepository noticeCommentRepository;
	private final UserAuthService userAuthService;
	private final UserRepository userRepository;

	@Transactional
	@Override
	public Slice<NoticeCommentDto> findNoticeComments(Pageable pageable, Long noticeId, String token) {

		Slice<NoticeComment> noticeCommentSlice = noticeCommentRepository.findByNotice_IdAndState(pageable, noticeId,
			0);

		return noticeCommentSlice.map(noticeComment -> getCommentDto(noticeComment, token));
	}

	@Transactional
	@Override
	public NoticeCommentDto addNoticeComment(String token, NoticeCommentDto noticeCommentDto, Long noticeId) {

		UserDto userDto = userAuthService.findUser(token, true);

		Notice notice = noticeRepository.findById(noticeId)
			.orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_ENTITY));
		notice.handleComment(true);

		NoticeComment noticeComment = noticeCommentRepository.save(NoticeComment.builder()
			.user(userRepository.getReferenceById(userDto.getId()))
			.notice(noticeRepository.getReferenceById(noticeId))
			.content(noticeCommentDto.getContent())
			.build());

		return getCommentDto(noticeComment, token);
	}

	@Transactional
	@Override
	public void removeNoticeComment(String token, Long commentId) {

		UserDto userDto = userAuthService.findUser(token, true);

		NoticeComment noticeComment = noticeCommentRepository.findById(commentId)
			.orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_ENTITY));

		if (!noticeComment.getUser().getId()
			.equals(userDto.getId())) {
			throw new CustomException(ErrorCode.NO_AUTHORITY);
		}

		noticeComment.getNotice().handleComment(false);
		noticeCommentRepository.deleteById(commentId);
	}

	private NoticeCommentDto getCommentDto(NoticeComment noticeComment, String token) {
		UserDto userDto = userAuthService.findUser(token, false);

		Boolean isUser = userDto != null && userDto.getId().equals(noticeComment.getUser().getId());

		return NoticeConverter.noticeCommentConvertToDto(noticeComment, isUser);
	}
}
