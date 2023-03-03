package com.nyang.cat.dev.communities.service.user;

import com.nyang.cat.dev.communities.dto.user.UserCommunityReportDto;

public interface UserCommunityActionService {

    public void communityLike(Long id, String token);

    public void communityReport(Long id, UserCommunityReportDto userCommunityReportDto, String token);

    public void communityScrap(Long id, String token);
}
