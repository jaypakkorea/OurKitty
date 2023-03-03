package com.nyang.cat.dev.admins.service;


import com.nyang.cat.dev.admins.dto.AdminDto;
import com.nyang.cat.dev.admins.dto.CommunityListDto;
import com.nyang.cat.dev.admins.dto.CommunityReportDto;
import com.nyang.cat.dev.admins.dto.DishVisitDto;
import com.nyang.cat.dev.admins.dto.DishVisitGraphDto;
import com.nyang.cat.dev.admins.dto.DishVisitImageDto;
import com.nyang.cat.dev.admins.dto.ReportCommunityDetailDto;
import com.nyang.cat.dev.admins.repository.AdminRepository;
import com.nyang.cat.dev.communities.repository.CommunityImgRepository;
import com.nyang.cat.dev.communities.repository.CommunityReportRepository;
import com.nyang.cat.dev.communities.repository.CommunityRepository;
import com.nyang.cat.dev.dishes.repository.DishRepository;
import com.nyang.cat.dev.pictures.repository.PictureIoTCatImgRepository;
import com.nyang.cat.domain.*;
import com.nyang.cat.exception.common.CustomException;
import com.nyang.cat.exception.constants.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService{

    private final CommunityReportRepository communityReportRepository;

    private final CommunityRepository communityRepository;

    private final DishRepository dishRepository;

    private final AdminAuthService adminAuthService;

    private final PictureIoTCatImgRepository pictureIoTCatImgRepository;

    private final CommunityImgRepository communityImgRepository;

    private final AdminRepository adminRepository;

    /**
     * 해당 냥그릇의 신고된 글 목록 확인하기
     * @param dishId    냥그릇 id
     * @return  1회 이상 신고된 글 리스트
     */
    @Transactional
    @Override
    public List<CommunityListDto> findReportedCommunityByDishId(Long dishId, String token) {
        AdminDto adminDto = adminAuthService.findAdmin(token);

        List<CommunityListDto> communityListDtoList = new ArrayList<>();

        Optional<Dish> optionalDish =  dishRepository.findById(dishId);

        //해당 냥그릇이 없으면
        if(optionalDish.isEmpty()) {
            throw new CustomException(ErrorCode.NOT_FOUND_ENTITY);
        }
        Dish dish = optionalDish.get();

        //냥그릇의 관리자 그룹이 현재 관리자가 속한 그룹인지
        dishAuthorityCheck(dish, adminDto);

        List<Community> communityList =  communityRepository.findByDishAndReportsCountGreaterThan(dish,0);

        for(Community community : communityList) {
            communityListDtoList.add(communityConvertToCommunityListDto(community));
        }

        return communityListDtoList;
    }

    /**
     * 전체 게시판의 신고된 글 목록 확인하기
     * @return  1회 이상 신고된 글 리스트
     */
    @Override
    public List<CommunityListDto> findReportedCommunity(String token) {
        AdminDto adminDto = adminAuthService.findAdmin(token);

        List<CommunityListDto> communityListDtoList = new ArrayList<>();

        List<Community> communityList =  communityRepository.findByDishAndReportsCountGreaterThan(null,0);


        for(Community community : communityList) {
            communityListDtoList.add(communityConvertToCommunityListDto(community));
        }

        return communityListDtoList;
    }

    /**
     * 하나의 게시글에 대한 신고 내역 리스트를 확인
     * @param communityId   게시글 id
     * @return  신고 내역 리스트
     * @throws
     */
    @Transactional
    @Override
    public List<CommunityReportDto> findReportsByCommunity(Long communityId, String token) {
        AdminDto adminDto = adminAuthService.findAdmin(token);

        List<CommunityReportDto> communityReportDtoList = new ArrayList<>();

        Community community = findCommunityById(communityId);

        //관리자 그룹이 관리하는 게시글인지 확인
        dishAuthorityCheck(community.getDish(), adminDto);

        List<CommunityReport> communityReportList = communityReportRepository.findByCommunity(community);

        for(CommunityReport communityReport : communityReportList) {
            communityReportDtoList.add(communityReportConvertToCommunityReportDto(communityReport));
        }

        return communityReportDtoList;
    }

    /**
     * 게시글 삭제 처리
     * @param communityId    게시글 id
     */
    @Transactional
    @Override
    public void blockCommunity(Long communityId, String token) {
        AdminDto adminDto = adminAuthService.findAdmin(token);

        Community community = findCommunityById(communityId);

        //관리자 그룹이 관리하는 게시글인지 확인
        dishAuthorityCheck(community.getDish(), adminDto);


        if(community.getCommunityState()!=0){
            //이미 삭제 또는 block 처리된 경우
            throw new CustomException(ErrorCode.ALREADY_BLOCKED_COMMUNITY);
        }

        community.blockCommunity();
    }

    @Transactional
    @Override
    public void recoverCommunity(Long communityId, String token) {
        AdminDto adminDto = adminAuthService.findAdmin(token);

        Community community = findCommunityById(communityId);

        //관리자 그룹이 관리하는 게시글인지 확인
        dishAuthorityCheck(community.getDish(), adminDto);

        if(community.getCommunityState()!=2) {
            //block 처리되지 않거나 삭제된 글인 경우
            throw new CustomException(ErrorCode.ALREADY_UNBLOCKED_COMMUNITY);
        }

        community.setCommunityStateOn();
    }

    /**
     * 냥그릇의 특정 시간동안 찍힌 사진 수 찾기
     * @param id    냥그릇 id
     * @param endDate   조회할 마지막 날짜 (마지막 날짜 기준 일주일 데이터 조회)
     * @param token     admin token
     * @return      특정 기간동안 시간별 찍힌 사진 수 반환
     */
    @Transactional
    @Override
    public List<Map<String, Object>> findDishVisitData(Long id, LocalDate endDate, String token) {
        AdminDto adminDto = adminAuthService.findAdmin(token);

        LocalDateTime startDateTime = LocalDateTime.of(endDate.minusDays(6), LocalTime.of(0,0,0));
        LocalDateTime endDateTime = LocalDateTime.of(endDate, LocalTime.of(23,59,59));

        Optional<Dish> optionalDish = dishRepository.findById(id);

        if(optionalDish.isEmpty()) {
            throw new CustomException(ErrorCode.NOT_FOUND_ENTITY);
        }
        Dish dish = optionalDish.get();

        List<IoTCatImg> ioTCatImgList = pictureIoTCatImgRepository.findIoTCatImgsByDishAndCreatedDateBetween(dish, startDateTime, endDateTime);

        return filterIotImgByTime(ioTCatImgList, startDateTime);
        //return reverseMatrix(filterIotImgByDate(ioTCatImgList, startDateTime));
    }

    /**
     * 신고된 게시글 상세 조회
     * @param id    커뮤니티 id
     * @return
     */
    @Transactional
    @Override
    public ReportCommunityDetailDto reportCommunityDetail(Long id, String token) {
        AdminDto adminDto = adminAuthService.findAdmin(token);

        // 커뮤니티 조회
        Community findCommunity = findCommunityById(id);

        //관리자 그룹이 관리하는 게시글인지 확인
        dishAuthorityCheck(findCommunity.getDish(), adminDto);

        // 커뮤니티 이미지 조회
        List<CommunityImg> imgs = communityImgRepository.findByCommunity(findCommunity);
        List<String> communityImgs = imgs.stream().map(CommunityImg::getImgUrl).collect(Collectors.toList());

        // dish null 체크
        Long dishId = null;
        String dishName = null;

        if (findCommunity.getDish() != null) {
            dishId = findCommunity.getDish().getId();
            dishName = findCommunity.getDish().getDishName();
        }

        // 커뮤니티 디테일 조회
        ReportCommunityDetailDto result = ReportCommunityDetailDto.builder()
            .id(findCommunity.getId())
            .dishId(dishId)
            .dishName(dishName)
            .communityCategoryName(findCommunity.getCommunityCategory().getCategoryName())
            .content(findCommunity.getContent())
            .userId(findCommunity.getUser().getId())
            .userName(findCommunity.getUser().getNickName())
            .likeCount(findCommunity.getLikeCount())
            .commentCount(findCommunity.getCommentCount())
            .reportsCount(findCommunity.getReportsCount())
            .communityState(findCommunity.getCommunityState())
            .communityImgs(communityImgs)
            .createdDate(findCommunity.getCreatedDate())
            .modifiedDate(findCommunity.getLastModifiedDate())
            .build();

        return result;
    }

    @Override
    public void modifyAdmin(String token, AdminDto modifyAdminDto) {
        AdminDto adminDto = adminAuthService.findAdmin(token);
        Optional<Admin> adminOptional = adminRepository.findById(adminDto.getId());

        if(adminOptional.isEmpty()) {
            throw new CustomException(ErrorCode.NOT_FOUND_ENTITY);
        }

        Admin admin = adminOptional.get();

        admin.modify(modifyAdminDto.getAdminName(), modifyAdminDto.getAdminPhone(),modifyAdminDto.getAdminRole());
        adminRepository.save(admin);
    }

    private CommunityListDto communityConvertToCommunityListDto(Community community) {

        CommunityListDto communityListDto = CommunityListDto.builder()
            .id(community.getId())
            .communityCategoryName(community.getCommunityCategory().getCategoryName())
            .content(community.getContent())
            .userId(community.getUser().getId())
            .userName(community.getUser().getNickName())
            .likeCount(community.getLikeCount())
            .reportsCount(community.getReportsCount())
            .communityState(community.getCommunityState())
            .createdDate(community.getCreatedDate())
            .build();

        return communityListDto;
    }

    private CommunityReportDto communityReportConvertToCommunityReportDto(CommunityReport communityReport) {
        CommunityReportDto communityReportDto = CommunityReportDto.builder()
            .id(communityReport.getId())
            .communityId(communityReport.getCommunity().getId())
            .userId(communityReport.getUser().getId())
            .userName(communityReport.getUser().getNickName())
            .reportsContent(communityReport.getReportsContent())
            .dishId(communityReport.getDishId())
            .createdDate(communityReport.getCreatedDate())
            .build();
        return communityReportDto;
    }

    /**
     * 게시글 정보 가져오고, 없으면 에러 처리하는 로직 (중복되서 메서드로 뺌)
     * @param communityId   게시글 id
     * @return  찾은 게시글
     */
    private Community findCommunityById(Long communityId) {
        //파라미터 예외 처리
        if(communityId==null) {
            throw new CustomException(ErrorCode.REQUEST_PARAMETER);
        }

        Optional<Community> optionalCommunity = communityRepository.findById(communityId);

        //해당 게시글이 없으면 예외 처리
        if(optionalCommunity.isEmpty()) {
            throw new CustomException(ErrorCode.NOT_FOUND_ENTITY);
        }

        return optionalCommunity.get();
    }

    /**
     * 해당 관리자의 그룹이 관리하는 냥그릇인지 확인 (아니면 예외처리)
     * @param dish  냥그릇
     * @param adminDto  관리자 dto
     */
    private void dishAuthorityCheck(Dish dish, AdminDto adminDto){
        Long dish_groupId = dish.getAdminGroup().getId();

        if(dish_groupId != null && dish_groupId != adminDto.getGroupId()){
            throw new CustomException(ErrorCode.NO_AUTHORITY);
        }
    }


    private List<Map<String, Object>> filterIotImgByTime(List<IoTCatImg> ioTCatImgs, LocalDateTime startDate){
        List<Map<String,Object>> result = new ArrayList<>();



        for ( int i = 0; i < 24; i++ ){
            Map<String, Object> timeMap = new HashMap<>();

            timeMap.put("name",String.format("%02d", i)+":00");

            List<DishVisitGraphDto> graphDtoList = new ArrayList<>();

            int time = i;

            List<IoTCatImg> nowTimeImgs = ioTCatImgs.stream()
                .filter(img -> img.getCreatedDate().getHour() == time )
                .collect(Collectors.toList());


            //시간별 날짜 이미지 가져오기
            for ( int j = 0; j < 7; j++) {

                // 현재 날짜 읽어오기
                LocalDate nowDate = startDate.plusDays(j).toLocalDate();


                DishVisitGraphDto graphDto = DishVisitGraphDto.builder()
                    .x(nowDate)
                    .y(0)
                    .imgs(new ArrayList<>())
                    .build();
                graphDtoList.add(graphDto);

            }
            for (IoTCatImg img : nowTimeImgs) {
                int idx = (int)ChronoUnit.DAYS.between(startDate.toLocalDate(), img.getCreatedDate().toLocalDate());
                graphDtoList.get(idx).plusY();
                DishVisitImageDto imageDto = DishVisitImageDto.builder()
                    .imgUrl(img.getImgUrl())
                    .createdDate(img.getCreatedDate())
                    .build();
                graphDtoList.get(idx).addImg(imageDto);
            }

            timeMap.put("data",graphDtoList);

            result.add(timeMap);
        }

        return result;
    }
}
