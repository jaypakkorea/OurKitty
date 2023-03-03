package com.nyang.cat.dev.communities.repository;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import com.nyang.cat.domain.Community;

import com.nyang.cat.domain.CommunityCategory;
import com.nyang.cat.domain.Dish;
import com.nyang.cat.domain.User;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CommunityRepository extends JpaRepository<Community, Long> {

    List<Community> findByDishAndReportsCountGreaterThan(Dish dish, Integer count);

    @Query("select c from Community c where c.communityState = 0 and c.id = :id")
    Optional<Community> findStateOnById(@Param("id") long id);

    @Query("select c from Community c where c.communityState = 0")
    Slice<Community> findSliceBy(Pageable pageable);

    @Query("select c from Community c where c.communityState = 0 and c.communityCategory =:category")
    Slice<Community> findSliceByCommunityCategory(Pageable pageable, CommunityCategory category);

    @Query("select c from Community c where c.communityState = 0 and c.dish =:dish")
    Slice<Community> findSliceByDish(Pageable pageable, Dish dish);

    @Query("select c from Community c where c.communityState = 0 and c.dish =:dish and c.communityCategory =:category")
    Slice<Community> findSliceByDishAndCommunityCategory(Pageable pageable, Dish dish, CommunityCategory category);

    @Query("select c from Community c where c.communityState = 0 and c.user =:user")
    Slice<Community> findSliceByUser(Pageable pageable, User user);

    Integer countByUserAndCommunityState(User user, Integer state);

}
