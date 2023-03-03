package com.nyang.cat.dev.notice.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;

import com.nyang.cat.domain.notice.Notice;
import com.nyang.cat.domain.notice.NoticeComment;

public interface NoticeCommentRepository extends JpaRepository<NoticeComment, Long> {

	Slice<NoticeComment> findByNotice_IdAndState(Pageable pageable, Long noticeId, Integer state);
}
