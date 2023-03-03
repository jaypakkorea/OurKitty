package com.nyang.cat.dev.notice.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nyang.cat.domain.notice.NoticeLike;

public interface NoticeLikeRepository extends JpaRepository<NoticeLike, Long> {

	Optional<NoticeLike> findByUser_IdAndNotice_Id(Long userId, Long noticeId);
}
