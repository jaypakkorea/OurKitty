package com.nyang.cat.dev.hospitals.controller;

import com.nyang.cat.dev.hospitals.dto.HospitalDto;
import com.nyang.cat.dev.hospitals.service.HospitalService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/hospitals")
@RequiredArgsConstructor
@Api(tags = {"동물병원"})
public class HospitalController {

    private final HospitalService hospitalService;

    @ApiOperation(value = "관리자 그룹에서 관리하는 동물병원 리스트 조회")
    @GetMapping("/admins")
    private ResponseEntity<?> hospitalAdminList(HttpServletRequest request){
        String token = request.getHeader("Authorization");

        List<HospitalDto> hospitalDtoList = hospitalService.findHospitalsByAdmin(token);

        return ResponseEntity.ok(hospitalDtoList);
    }

    @ApiOperation(value = "관리자 그룹에서 관리하는 동물병원 추가")
    @PostMapping("/admins")
    private ResponseEntity<?> hospitalAdd(@RequestBody HospitalDto hospitalDto, HttpServletRequest request) throws Exception{
        String token = request.getHeader("Authorization");

        Long id = hospitalService.add(hospitalDto, token);

        //반환할 객체
        HashMap<String, Object> result = new HashMap<>();
        result.put("id", id);

        return ResponseEntity.ok(result);
    }

    @ApiOperation(value = "관리자 - 동물병원 수정")
    @PutMapping("/admins")
    private ResponseEntity<?> hospitalModify(@RequestBody HospitalDto hospitalDto, HttpServletRequest request) throws Exception {
        String token = request.getHeader("Authorization");

        Long ret_id = hospitalService.modify(hospitalDto, token);

        //반환할 객체
        HashMap<String, Object> result = new HashMap<>();
        result.put("id", ret_id);

        return ResponseEntity.ok(result);
    }


    @ApiOperation(value = "관리자 - 동물병원 삭제")
    @DeleteMapping("/admins/{id}")
    private ResponseEntity<?> hospitalRemove(@PathVariable("id") Long id, HttpServletRequest request) throws Exception {
        String token = request.getHeader("Authorization");

        Long ret_id = hospitalService.delete(id, token);

        //반환할 객체
        HashMap<String, Object> result = new HashMap<>();
        result.put("id", ret_id);

        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }

    @ApiOperation(value = "현재 지도 범위 안의 동물병원 불러오기")
    @GetMapping("")
    private ResponseEntity<?> hospitalGpsList(@RequestParam Map<String, String> params){

        List<HospitalDto> hospitalDtoList = hospitalService.findHospitalsByGps(params);

        return ResponseEntity.ok(hospitalDtoList);
    }
}
