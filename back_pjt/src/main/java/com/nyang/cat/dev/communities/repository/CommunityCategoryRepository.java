package com.nyang.cat.dev.communities.repository;

import com.nyang.cat.domain.Admin;
import com.nyang.cat.domain.CommunityCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommunityCategoryRepository extends JpaRepository<CommunityCategory, Long> {
}
