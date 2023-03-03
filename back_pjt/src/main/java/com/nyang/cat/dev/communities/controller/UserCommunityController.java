package com.nyang.cat.dev.communities.controller;

import java.io.IOException;

import com.nyang.cat.dev.communities.dto.user.UserCommunityCommentAddDto;
import com.nyang.cat.dev.communities.dto.user.UserCommunityCommentDto;
import com.nyang.cat.dev.communities.dto.user.UserCommunityDetailDto;
import com.nyang.cat.dev.communities.dto.user.UserCommunityReportDto;
import com.nyang.cat.dev.communities.dto.user.UserCommunityRequestDto;
import com.nyang.cat.dev.communities.service.user.UserCommunityActionService;
import com.nyang.cat.dev.communities.service.user.UserCommunityCommentActionService;
import com.nyang.cat.dev.communities.service.user.UserCommunityCommentService;
import com.nyang.cat.dev.communities.service.user.UserCommunityService;

import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/communities/user")
@RequiredArgsConstructor
public class UserCommunityController {

	private final UserCommunityService userCommunityService;
	private final UserCommunityActionService userCommunityActionService;
	private final UserCommunityCommentService userCommunityCommentService;
	private final UserCommunityCommentActionService userCommunityCommentActionService;

	//커뮤니티 등록
	@PostMapping
	public ResponseEntity<?> communityAdd(UserCommunityRequestDto userCommunityRequestDto,
		@RequestHeader(value = "Authorization") String token) throws IOException {
		userCommunityService.userCommunityUserAdd(userCommunityRequestDto, token);
		return ResponseEntity.status(HttpStatus.CREATED).body("커뮤니티 생성 성공");

	}

	//커뮤니티 수정
	@PutMapping("/{id}")
	public ResponseEntity<?> communityModify(@PathVariable(value = "id") Long id,
		UserCommunityRequestDto userCommunityRequestDto,
		@RequestHeader(value = "Authorization") String token
	) throws IOException {
		userCommunityService.userCommunityUserModify(id, userCommunityRequestDto, token);
		return ResponseEntity.status(HttpStatus.CREATED).body(id);
	}

	//커뮤니티 삭제
	@DeleteMapping("/{id}")
	public ResponseEntity<?> communityDelete(@PathVariable(value = "id") long id,
		@RequestHeader(value = "Authorization") String token) throws IOException {
		userCommunityService.userCommunityDelete(id, token);
		return ResponseEntity.ok("게시글 삭제완료");
	}

	//커뮤니티 하나 불러오기
	@GetMapping("/{id}")
	public ResponseEntity<?> communityDetails(@PathVariable(value = "id") long id,
		@RequestHeader(value = "Authorization", required = false) String token) {
		UserCommunityDetailDto userCommunityDetailDto = userCommunityService.userCommunityDetails(id, token);
		return ResponseEntity.ok(userCommunityDetailDto);
	}

	//커뮤니티 목록 불러오기
	@GetMapping
	public ResponseEntity<?> communityList(Pageable pageable,
		@RequestHeader(value = "Authorization", required = false) String token,
		@RequestParam(required = false) Long tagId) {
		Slice<UserCommunityDetailDto> pages = userCommunityService.userCommunityList(pageable, token, tagId);
		return ResponseEntity.ok(pages);
	}

	//냥그릇별 커뮤니티 목록 불러오기
	@GetMapping("/dishes/{id}")
	public ResponseEntity<Object> communityDishList(@PathVariable(value = "id") Long id,
		Pageable pageable, @RequestHeader(value = "Authorization", required = false) String token,
		@RequestParam(required = false) Long tagId) {
		Slice<UserCommunityDetailDto> pages = userCommunityService.userCommunityDishList(pageable, id, token, tagId);
		return ResponseEntity.ok(pages);
	}

	//스크랩한 커뮤니티 불러오기
	@GetMapping("/scrap")
	public ResponseEntity<?> communityScrapList(Pageable pageable,
		@RequestHeader(value = "Authorization") String token) {
		Slice<UserCommunityDetailDto> pages = userCommunityService.userCommunityScrapList(pageable, token);
		return ResponseEntity.ok(pages);
	}

	// 사용자가 작성한 커뮤니티 리스트
	@GetMapping("/users")
	public ResponseEntity<?> communityUserList(Pageable pageable,
		@RequestHeader(value = "Authorization") String token) {
		Slice<UserCommunityDetailDto> pages = userCommunityService.userCommunityUserList(pageable, token);
		return ResponseEntity.ok(pages);
	}

	//커뮤니티 좋아요
	@PostMapping("/{id}/like")
	public ResponseEntity<Object> communityDishLike(@PathVariable(value = "id") Long id,
		@RequestHeader(value = "Authorization") String token) {
		userCommunityActionService.communityLike(id, token);
		return ResponseEntity.status(HttpStatus.OK).body("커뮤니티 좋아요 성공");
	}

	//커뮤니티 스크랩
	@PostMapping("/{id}/scrap")
	public ResponseEntity<Object> communityScrap(@PathVariable(value = "id") Long id,
		@RequestHeader(value = "Authorization") String token) {
		userCommunityActionService.communityScrap(id, token);
		return ResponseEntity.status(HttpStatus.OK).body("커뮤니티 스크랩 성공");
	}

	//커뮤니티 신고
	@PostMapping("/{id}/report")
	public ResponseEntity<?> communityReport(@PathVariable(value = "id") Long id,
		@RequestBody UserCommunityReportDto userCommunityReportDto,
		@RequestHeader(value = "Authorization") String token) {
		userCommunityActionService.communityReport(id, userCommunityReportDto, token);
		return ResponseEntity.status(HttpStatus.OK).body("커뮤니티 신고 성공");
	}

	//댓글 추가
	@PostMapping("{cid}/comments")
	public ResponseEntity<?> communityCommentAdd(@PathVariable(value = "cid") Long cid,
		@RequestHeader(value = "Authorization") String token,
		@RequestBody UserCommunityCommentAddDto userCommunityCommentAddDto) {

		UserCommunityCommentDto userCommunityCommentDto = userCommunityCommentService.communityCommentAdd(cid, token,
			userCommunityCommentAddDto);
		return ResponseEntity.ok(userCommunityCommentDto);
	}

	//댓글 삭제
	@DeleteMapping("comments/{id}")
	public ResponseEntity<?> communityCommentRemove(
		@PathVariable(value = "id") Long id, @RequestHeader(value = "Authorization") String token) {
		userCommunityCommentService.communityCommentDelete(id, token);
		return ResponseEntity.status(HttpStatus.OK).body("댓글삭제 성공");
	}

	//댓글 불러오기
	@GetMapping("{cid}/comments")
	public ResponseEntity<?> communityCommentList(Pageable pageable, @PathVariable(value = "cid") Long cid,
		@RequestHeader(value = "Authorization", required = false) String token) {

		Slice<UserCommunityCommentDto> communityCommentList = userCommunityCommentService.communityCommentList(pageable,
			cid, token);
		return ResponseEntity.ok(communityCommentList);
	}

	//댓글 공감
	@PostMapping("comments/{id}/like")
	public ResponseEntity<?> communityCommentLike(@PathVariable(value = "id") Long id,
		@RequestHeader(value = "Authorization") String token) {
		userCommunityCommentActionService.communityCommentLike(id, token);
		return ResponseEntity.status(HttpStatus.OK).body("댓글공감 성공");
	}
}
