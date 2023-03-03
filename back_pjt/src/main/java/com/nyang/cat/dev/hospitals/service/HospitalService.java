package com.nyang.cat.dev.hospitals.service;

import com.nyang.cat.dev.hospitals.dto.HospitalDto;

import java.util.List;
import java.util.Map;

public interface HospitalService {

    public List<HospitalDto> findHospitalsByGps(Map<String, String> params);

    public Long modify(HospitalDto hospitalDto, String token);

    public Long add(HospitalDto hospitalDto, String token);

    public Long delete(Long id, String token);

	List<HospitalDto> findHospitalsByAdmin(String token);
}
