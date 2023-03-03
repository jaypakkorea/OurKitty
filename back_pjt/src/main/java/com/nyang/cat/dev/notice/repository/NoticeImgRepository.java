package com.nyang.cat.dev.notice.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nyang.cat.domain.notice.NoticeImg;

public interface NoticeImgRepository extends JpaRepository<NoticeImg, Long> {

	List<NoticeImg> findByNotice_Id(Long id);
}
