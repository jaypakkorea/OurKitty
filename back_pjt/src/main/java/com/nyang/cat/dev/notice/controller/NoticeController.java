package com.nyang.cat.dev.notice.controller;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nyang.cat.dev.notice.dto.NoticeCommentDto;
import com.nyang.cat.dev.notice.dto.NoticeDto;
import com.nyang.cat.dev.notice.dto.NoticeRequestDto;
import com.nyang.cat.dev.notice.service.NoticeCommentService;
import com.nyang.cat.dev.notice.service.NoticeService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/notices")
@RequiredArgsConstructor
@Api(tags = "관리자 글")
public class NoticeController {

	private final NoticeService noticeService;
	private final NoticeCommentService noticeCommentService;

	@ApiOperation(value = "관리자 글 등록")
	@PostMapping
	public ResponseEntity<?> noticeAdd(@RequestHeader(value = "Authorization") String token,
		NoticeRequestDto noticeRequestDto) {

		NoticeDto noticeDto = noticeService.addNotice(token, noticeRequestDto);

		return ResponseEntity.ok(noticeDto);
	}

	@ApiOperation(value = "관리자 글 수정")
	@PutMapping("/{id}")
	public ResponseEntity<?> noticeModify(@RequestHeader(value = "Authorization") String token,
		NoticeRequestDto noticeRequestDto, @PathVariable(value = "id") Long noticeId) {

		NoticeDto noticeDto = noticeService.modifyNotice(token, noticeId, noticeRequestDto);

		return ResponseEntity.ok(noticeDto);
	}

	@ApiOperation(value = "관리자 글 수정")
	@DeleteMapping("/{id}")
	public ResponseEntity<?> noticeRemove(@RequestHeader(value = "Authorization") String token,
		@PathVariable(value = "id") Long noticeId) {

		NoticeDto noticeDto = noticeService.removeNotice(token, noticeId);

		return ResponseEntity.ok(noticeDto);
	}

	@ApiOperation(value = "관리자 글 목록 조회")
	@GetMapping
	public ResponseEntity<?> noticeList(@RequestHeader(value = "Authorization", required = false) String token,
		Pageable pageable) {

		Slice<NoticeDto> noticeDtoList = noticeService.findNotices(token, pageable);

		return ResponseEntity.ok(noticeDtoList);
	}

	@ApiOperation(value = "관리자 글 상세 조회")
	@GetMapping("/{id}")
	public ResponseEntity<?> noticeDetails(@RequestHeader(value = "Authorization", required = false) String token,
		@PathVariable(value = "id") Long noticeId) {

		NoticeDto noticeDto = noticeService.findNotice(token, noticeId);
		System.out.println("noticeDto = " + noticeDto);

		return ResponseEntity.ok(noticeDto);
	}

	@ApiOperation(value = "관리자 글 좋아요")
	@PostMapping("/{id}/like")
	public ResponseEntity<?> noticeDetail(@RequestHeader(value = "Authorization") String token,
		@PathVariable(value = "id") Long noticeId) {
		noticeService.modifyLike(token, noticeId);

		return ResponseEntity.status(HttpStatus.CREATED).build();
	}

	@ApiOperation(value = "관리자 글 댓글 불러오기")
	@GetMapping("/{id}/comments")
	public ResponseEntity<?> noticeCommentList(@RequestHeader(value = "Authorization", required = false) String token,
		@PathVariable(value = "id") Long noticeId, Pageable pageable) {

		Slice<NoticeCommentDto> noticeCommentDtoSlice = noticeCommentService.findNoticeComments(pageable, noticeId,
			token);

		return ResponseEntity.ok(noticeCommentDtoSlice);
	}

	@ApiOperation(value = "관리자 글 댓글 추가")
	@PostMapping("/{id}/comments")
	public ResponseEntity<?> noticeCommentAdd(@RequestHeader(value = "Authorization", required = false) String token,
		@PathVariable(value = "id") Long noticeId, @RequestBody NoticeCommentDto noticeCommentDto) {

		NoticeCommentDto returnDto = noticeCommentService.addNoticeComment(token, noticeCommentDto, noticeId);

		return ResponseEntity.ok(returnDto);
	}

	@ApiOperation(value = "관리자 글 댓글 삭제")
	@DeleteMapping("/comments/{cid}")
	public ResponseEntity<?> noticeCommentDelete(@RequestHeader(value = "Authorization", required = false) String token,
		@PathVariable(value = "cid") Long noticeCommentId) {

		noticeCommentService.removeNoticeComment(token, noticeCommentId);
		return ResponseEntity.ok("delete success");
	}

	@ApiOperation(value = "관리자 소속에 해당하는 모든 관리자 글 불러오기")
	@GetMapping("/admin-groups")
	public ResponseEntity<?> noticeCommentList(@RequestHeader(value = "Authorization") String token) {

		List<NoticeDto> noticeDtoList = noticeService.findNoticesByGroupId(token);

		return ResponseEntity.ok(noticeDtoList);
	}
}
