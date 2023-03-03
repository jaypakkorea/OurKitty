package com.nyang.cat.dev.communities.repository;

import java.util.List;
import java.util.Optional;

import com.nyang.cat.domain.Community;
import com.nyang.cat.domain.CommunityCategory;
import com.nyang.cat.domain.CommunityImg;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CommunityImgRepository extends JpaRepository<CommunityImg, Long> {

	void deleteByCommunity(Community community);

	List<CommunityImg> findByCommunity(Community community);

}
