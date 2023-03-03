package com.nyang.cat.dev.notice.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;

import com.nyang.cat.domain.notice.Notice;

public interface NoticeRepository extends JpaRepository<Notice, Long> {

	Slice<Notice> findByStateOrderByCreatedDateDesc(Pageable pageable, Integer state);

	Optional<Notice> findByIdAndState(Long id, Integer state);

	List<Notice> findByAdmin_Group_IdAndStateOrderByCreatedDateDesc(Long groupId, Integer state);
}
