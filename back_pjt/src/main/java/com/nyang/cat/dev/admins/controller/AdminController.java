package com.nyang.cat.dev.admins.controller;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import com.nyang.cat.dev.admins.dto.*;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.nyang.cat.dev.admins.service.AdminFoodLogService;
import com.nyang.cat.dev.admins.service.AdminGroupService;
import com.nyang.cat.dev.admins.service.AdminService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/admins")
@RequiredArgsConstructor
@Api(tags = {"관리자"})
public class AdminController {

	private final AdminService adminService;
	private final AdminFoodLogService adminFoodLogService;
	private final AdminGroupService adminGroupService;

	@ApiOperation(value = "1회 이상 신고된 글 불러오기 (dishId = null 또는 냥그릇 id)")
	@GetMapping("/reports")
	public ResponseEntity<Object> adminReportCommunityList(HttpServletRequest request,
		@RequestParam(value = "dishId", required = false) Long dishId) throws Exception {
		String token = request.getHeader("Authorization");

		if (dishId != null) {
			List<CommunityListDto> communityList = adminService.findReportedCommunityByDishId(dishId, token);
			HashMap<String, Object> map = new HashMap<>();
			map.put("dishId", dishId);
			map.put("communityList", communityList);
			return ResponseEntity.status(HttpStatus.OK).body(map);
		}
		List<CommunityListDto> communityList = adminService.findReportedCommunity(token);
		HashMap<String, Object> map = new HashMap<>();
		map.put("communityList", communityList);
		return ResponseEntity.status(HttpStatus.OK).body(map);

	}

	@ApiOperation(value = "특정 글의 신고내역 리스트 불러오기")
	@GetMapping("/reports/{cid}")
	public ResponseEntity<Object> adminReportList(HttpServletRequest request,
		@PathVariable(value = "cid") Long communityId) throws Exception {
		String token = request.getHeader("Authorization");

		List<CommunityReportDto> communityReportDtoList = adminService.findReportsByCommunity(communityId, token);
		HashMap<String, Object> map = new HashMap<>();
		map.put("reportList", communityReportDtoList);
		return ResponseEntity.status(HttpStatus.OK).body(map);
	}

	//신고대상 처리하기
	@ApiOperation(value = "신고글 삭제 처리하기")
	@PutMapping("/reports/{cid}")
	public ResponseEntity<Object> adminReportOff(HttpServletRequest request, @PathVariable("cid") Long id) throws
		Exception {
		String token = request.getHeader("Authorization");

		adminService.blockCommunity(id, token);

		HashMap<String, Object> map = new HashMap<>();
		map.put("id", id);
		return ResponseEntity.status(HttpStatus.OK).body(map);
	}

	//신고글 block 취소
	@ApiOperation(value = "block 된 글 block 해제하기")
	@PutMapping("/reports/off/{cid}")
	public ResponseEntity<Object> adminBlockOff(HttpServletRequest request, @PathVariable("cid") Long id) throws
			Exception {
		String token = request.getHeader("Authorization");

		adminService.recoverCommunity(id, token);

		HashMap<String, Object> map = new HashMap<>();
		map.put("id", id);
		return ResponseEntity.status(HttpStatus.OK).body(map);
	}

	@ApiOperation(value = "신고 게시글 상세조회")
	@GetMapping("/communities/{cid}")
	public ResponseEntity<Object> reportCommunityDetail(HttpServletRequest request, @PathVariable("cid") Long id) throws
			Exception {
		String token = request.getHeader("Authorization");

		ReportCommunityDetailDto communityDetailDto = adminService.reportCommunityDetail(id, token);

		return ResponseEntity.status(HttpStatus.OK).body(communityDetailDto);
	}


	@ApiOperation(value = "냥그릇 방문 데이터 조회")
	@GetMapping("/dishes/visit/{id}")
	public ResponseEntity<Object> findDishVisitData(@PathVariable("id") Long id,
		@RequestParam(value = "date", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date
		,@RequestHeader(value = "Authorization") String token) {
		if (date == null) {
			//현재 날짜 넣어주기
			date = LocalDate.now();
		}
		List<Map<String,Object>> data = adminService.findDishVisitData(id, date, token);

		return ResponseEntity.status(HttpStatus.OK).body(data);
	}

	@ApiOperation(value = "냥그릇 무게 데이터 조회")
	@GetMapping("/dishes/weight/{id}")
	public ResponseEntity<?> findDishWeightLogs(@RequestHeader(value = "Authorization", required = false) String token,
		@PathVariable Long id, @RequestParam String date) {

		return ResponseEntity.ok(adminFoodLogService.findFoodLogs(id, token, date));
	}

	@ApiOperation(value = "관리자 그룹 불러오기")
	@GetMapping("/groups")
	public ResponseEntity<?> findAdminGroups() {

		List<String> list = adminGroupService.findAdminGroups();

		return ResponseEntity.ok(list);
	}

	@ApiOperation(value = "관리자 관리하는 냥그릇 모든 무게 데이터 가져오기")
	@GetMapping("/dishes/weight")
	public ResponseEntity<?> findAllDishWeightLogs(@RequestHeader(value = "Authorization", required = false) String token, @RequestParam String date){
		return ResponseEntity.ok(adminFoodLogService.findAllDishFoodLogs(token, date));
	}

	@ApiOperation(value = "관리자 정보 수정하기")
	@PutMapping("/")
	public ResponseEntity<?> modifyAdmin(@RequestHeader(value = "Authorization", required = false) String token, @RequestBody AdminDto adminDto){
		adminService.modifyAdmin(token, adminDto);

		return ResponseEntity.ok("modifed");
	}
}
