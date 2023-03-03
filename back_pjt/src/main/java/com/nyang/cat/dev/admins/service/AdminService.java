package com.nyang.cat.dev.admins.service;

import com.nyang.cat.dev.admins.dto.AdminDto;
import com.nyang.cat.dev.admins.dto.ReportCommunityDetailDto;
import com.nyang.cat.dev.admins.dto.CommunityListDto;
import com.nyang.cat.dev.admins.dto.CommunityReportDto;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

public interface AdminService {

    List<CommunityReportDto> findReportsByCommunity(Long communityId, String token);

    List<CommunityListDto> findReportedCommunityByDishId(Long dishId, String token);

    List<CommunityListDto> findReportedCommunity(String token);

    void blockCommunity(Long id, String token);

    void recoverCommunity(Long id, String token);

    List<Map<String, Object>> findDishVisitData(Long id, LocalDate endDate, String token);

    ReportCommunityDetailDto reportCommunityDetail(Long id, String token);

    void modifyAdmin(String token, AdminDto modifyAdminDto);
}
