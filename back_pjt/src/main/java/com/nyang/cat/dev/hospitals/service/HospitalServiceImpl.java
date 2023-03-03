package com.nyang.cat.dev.hospitals.service;

import com.nyang.cat.dev.admins.dto.AdminDto;
import com.nyang.cat.dev.admins.repository.AdminGroupRepository;
import com.nyang.cat.dev.admins.service.AdminAuthService;
import com.nyang.cat.dev.hospitals.dto.HospitalDto;
import com.nyang.cat.dev.hospitals.repository.HospitalRepository;
import com.nyang.cat.domain.Admin;
import com.nyang.cat.domain.AdminGroup;
import com.nyang.cat.domain.Hospital;
import com.nyang.cat.exception.common.CustomException;
import com.nyang.cat.exception.constants.ErrorCode;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.transaction.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class HospitalServiceImpl implements HospitalService{

    private final AdminGroupRepository adminGroupRepository;

    private final HospitalRepository hospitalRepository;

    private final AdminAuthService adminAuthService;

    /**
     * 관리자 - 병원 수정하기
     * @param hospitalDto   수정할 병원 정보
     * @param token     관리자 토큰
     * @return  수정된 병원 id
     */
    @Transactional
    @Override
    public Long modify(HospitalDto hospitalDto, String token) {
        AdminDto adminDto = adminAuthService.findAdmin(token);

        Optional<Hospital> optionalHospital = hospitalRepository.findById(hospitalDto.getId());

        if(optionalHospital.isEmpty()){
            throw new CustomException(ErrorCode.NOT_FOUND_ENTITY);
        }

        Hospital hospital = optionalHospital.get();

        //현재 admin 그룹이 관리하는 병원이 아니면 권한 없음 에러
        if(hospital.getGroup().getId() != adminDto.getGroupId()){
            throw new CustomException(ErrorCode.NO_AUTHORITY);
        }


        Hospital hospitalUpdate = Hospital.builder()
                .id(hospital.getId())
                .group(hospital.getGroup())
                .hospitalName(hospitalDto.getHospitalName())
                .address(hospitalDto.getAddress())
                .lat(hospitalDto.getLat())
                .lon(hospitalDto.getLon())
                .hospitalPhone(hospitalDto.getHospitalPhone())
                .hospitalState(hospitalDto.getHospitalState())
                .build();

        return hospitalRepository.save(hospitalUpdate).getId();
    }

    /**
     * 관리자 - 병원 추가하기
     * @param hospitalDto   추가할 병원 정보
     * @param token     관리자 토큰
     * @return      추가한 병원 id
     */
    @Transactional
    @Override
    public Long add(HospitalDto hospitalDto, String token) {
        AdminDto adminDto = adminAuthService.findAdmin(token);

        Optional<AdminGroup> optionalAdminGroup = adminGroupRepository.findById(adminDto.getGroupId());

        if(optionalAdminGroup.isEmpty()){
            throw new CustomException(ErrorCode.NOT_FOUND_ENTITY);
        }
        AdminGroup adminGroup = optionalAdminGroup.get();

        Optional<Hospital> optionalHospital = hospitalRepository.findHospitalByAddressAndHospitalName(hospitalDto.getAddress(),hospitalDto.getHospitalName());
        
        //이미 존재하는 병원일 경우
        if(optionalHospital.isPresent()) {
            throw new CustomException(ErrorCode.ALREADY_SAVED_DTO);
        }

        Hospital hospital = Hospital.builder()
                .hospitalName(hospitalDto.getHospitalName())
                .group(adminGroup)
                .address(hospitalDto.getAddress())
                .lat(hospitalDto.getLat())
                .lon(hospitalDto.getLon())
                .hospitalPhone(hospitalDto.getHospitalPhone())
                .hospitalState(hospitalDto.getHospitalState())
                .build();

        return hospitalRepository.save(hospital).getId();
    }

    /**
     * 관리자 - 병원 삭제
     * @param id    삭제할 병원 id
     * @param token     관리자 토큰
     * @return      삭제된 병원 id
     */
    @Transactional
    @Override
    public Long delete(Long id, String token) {

        if(id==null) {
            throw new CustomException(ErrorCode.REQUEST_PARAMETER);
        }

        AdminDto adminDto = adminAuthService.findAdmin(token);

        Optional<Hospital> optionalHospital = hospitalRepository.findById(id);

        if(optionalHospital.isEmpty()){
            throw new CustomException(ErrorCode.NOT_FOUND_ENTITY);
        }

        Hospital hospital = optionalHospital.get();

        //현재 admin 그룹이 관리하는 냥그릇이 아니면 권한 없음 에러
        if(hospital.getGroup().getId() != adminDto.getGroupId()){
            throw new CustomException(ErrorCode.NO_AUTHORITY);
        }

        hospitalRepository.delete(hospital);
        return hospital.getId();
    }

    /**
     *  지자체 협력 병원 목록 찾기
     * @param token 관리자 토큰
     * @return     지자체 협력 병원 리스트
     */
    @Override
    public List<HospitalDto> findHospitalsByAdmin(String token) {
        AdminDto adminDto = adminAuthService.findAdmin(token);

        List<HospitalDto> hospitalDtoList = new ArrayList<>();

        List<Hospital> hospitalList = hospitalRepository.findByGroup_Id(adminDto.getGroupId());

        for(Hospital hospital:hospitalList){
            hospitalDtoList.add(hospitalConvertToHospitalDto(hospital));
        }

        return hospitalDtoList;
    }

    /**
     * 지도 안의 병원 리스트 찾기
     * @param params    시작 위도, 경도, 끝 위도, 경도
     * @return      지도 안의 병원 리스트
     */
    public List<HospitalDto> findHospitalsByGps(Map<String, String> params){

        List<HospitalDto> hospitalDtoList = new ArrayList<>();
        Double swLat, swLon, neLat, neLon = null;

        try {
            swLat = Double.parseDouble(params.get("swLat"));
            swLon = Double.parseDouble(params.get("swLng"));
            neLat = Double.parseDouble(params.get("neLat"));
            neLon = Double.parseDouble(params.get("neLng"));

            log.debug("swLat: {}, swLong : {}, neLat : {}, neLon : {}", swLat, swLon, neLat, neLon);
        }
        catch (Exception e) {
            throw new CustomException(ErrorCode.REQUEST_PARAMETER);
        }


        List<Hospital> hospitalList = hospitalRepository.findHospitalsByLatBetweenAndLonBetween(swLat, neLat, swLon, neLon);

        for(Hospital hospital : hospitalList) {
            hospitalDtoList.add(hospitalConvertToHospitalDto(hospital));
        }

        return hospitalDtoList;
    }


    private HospitalDto hospitalConvertToHospitalDto(Hospital hospital) {
        return HospitalDto.builder()
                .id(hospital.getId())
                .hospitalName(hospital.getHospitalName())
                .address(hospital.getAddress())
                .lat(hospital.getLat())
                .lon(hospital.getLon())
                .hospitalPhone(hospital.getHospitalPhone())
                .hospitalState(hospital.getHospitalState())
                .build();
    }
}
