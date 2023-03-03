package com.nyang.cat.dev.notice.service;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.nyang.cat.dev.admins.repository.AdminRepository;
import com.nyang.cat.dev.admins.service.AdminAuthService;
import com.nyang.cat.dev.notice.dto.NoticeDto;
import com.nyang.cat.dev.notice.dto.NoticeRequestDto;
import com.nyang.cat.dev.notice.repository.NoticeImgRepository;
import com.nyang.cat.dev.notice.repository.NoticeLikeRepository;
import com.nyang.cat.dev.notice.repository.NoticeRepository;
import com.nyang.cat.dev.notice.service.common.NoticeCommon;
import com.nyang.cat.dev.users.dto.UserDto;
import com.nyang.cat.dev.users.repository.UserRepository;
import com.nyang.cat.dev.users.service.UserAuthService;
import com.nyang.cat.dev.util.S3Uploader;
import com.nyang.cat.dev.util.converter.NoticeConverter;
import com.nyang.cat.domain.Admin;
import com.nyang.cat.domain.User;
import com.nyang.cat.domain.notice.Notice;
import com.nyang.cat.domain.notice.NoticeImg;
import com.nyang.cat.domain.notice.NoticeLike;
import com.nyang.cat.exception.common.CustomException;
import com.nyang.cat.exception.constants.ErrorCode;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class NoticeServiceImpl implements NoticeService {

	private final NoticeRepository noticeRepository;
	private final NoticeImgRepository noticeImgRepository;
	private final NoticeLikeRepository noticeLikeRepository;
	private final AdminRepository adminRepository;
	private final UserRepository userRepository;
	private final UserAuthService userAuthService;
	private final AdminAuthService adminAuthService;
	private final S3Uploader s3Uploader;
	private final NoticeCommon noticeCommon;

	@Transactional
	@Override
	public Slice<NoticeDto> findNotices(String token, Pageable pageable) {

		UserDto userDto = userAuthService.findUser(token, false);

		Slice<Notice> noticeSlice = noticeRepository.findByStateOrderByCreatedDateDesc(pageable, 0);

		return noticeSlice.map(notice -> getNoticeDto(userDto, notice));
	}

	@Transactional
	@Override
	public NoticeDto findNotice(String token, Long noticeId) {

		UserDto userDto = userAuthService.findUser(token, false);
		Notice notice = noticeCommon.getNotice(noticeId);

		return getNoticeDto(userDto, notice);
	}

	@Transactional
	@Override
	public NoticeDto addNotice(String token, NoticeRequestDto noticeRequestDto) {

		Notice notice = noticeRepository.save(
			Notice.builder().admin(getAdmin(token)).content(noticeRequestDto.getContent()).build());

		if (noticeRequestDto.getImgFiles() != null) {
			for (MultipartFile imgFile : noticeRequestDto.getImgFiles()) {
				try {
					String imgUrl = s3Uploader.upload(imgFile);
					noticeImgRepository.save(NoticeImg.builder().imgUrl(imgUrl).notice(notice).build());
				} catch (IOException e) {
					throw new CustomException(ErrorCode.IMAGE_UPLOAD_FAIL);
				}
			}
		}

		return getNoticeDto(null, notice);
	}

	@Transactional
	@Override
	public NoticeDto modifyNotice(String token, Long noticeId, NoticeRequestDto noticeRequestDto) {

		Admin admin = getAdmin(token);

		Notice notice = noticeCommon.getNotice(noticeId);

		if (!notice.getAdmin().getId().equals(admin.getId())) {
			throw new CustomException(ErrorCode.NO_AUTHORITY);
		}

		notice.modifyNotice(noticeRequestDto.getContent());

		List<String> urls = noticeImgRepository.findByNotice_Id(noticeId)
			.stream()
			.map(NoticeImg::getImgUrl)
			.collect(Collectors.toUnmodifiableList());
		try {
			for (String imgUrl : urls) {
				s3Uploader.deleteFile(imgUrl);
			}

			if (noticeRequestDto.getImgFiles() != null) {

				for (MultipartFile imgFile : noticeRequestDto.getImgFiles()) {
					String imgUrl = s3Uploader.upload(imgFile);

					noticeImgRepository.save(NoticeImg.builder().imgUrl(imgUrl).notice(notice).build());
				}
			}
		} catch (IOException e) {
			throw new CustomException(ErrorCode.IMAGE_UPLOAD_FAIL);
		}

		return getNoticeDto(null, noticeRepository.save(notice));
	}

	@Transactional
	@Override
	public NoticeDto removeNotice(String token, Long noticeId) {

		Admin admin = getAdmin(token);

		Notice notice = noticeCommon.getNotice(noticeId);

		if (!notice.getAdmin().getId().equals(admin.getId())) {
			throw new CustomException(ErrorCode.NO_AUTHORITY);
		}

		notice.deleteNotice();
		return null;
	}

	@Transactional
	@Override
	public void modifyLike(String token, Long noticeId) {

		UserDto userDto = userAuthService.findUser(token, true);

		User user = userRepository.findById(userDto.getId())
			.orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_ENTITY));

		Notice notice = noticeCommon.getNotice(noticeId);

		NoticeLike noticeLike = noticeLikeRepository.findByUser_IdAndNotice_Id(userDto.getId(), noticeId)
			.orElse(NoticeLike.builder().state(1).user(user).notice(notice).build());

		noticeLike.handleLike();
		noticeLikeRepository.save(noticeLike);

		notice.handleLike(noticeLike.getState() == 0);
		noticeRepository.save(notice);
	}

	@Transactional
	@Override
	public List<NoticeDto> findNoticesByGroupId(String token) {

		Admin admin = getAdmin(token);

		return noticeRepository.findByAdmin_Group_IdAndStateOrderByCreatedDateDesc(admin.getGroup().getId(), 0)
			.stream()
			.map(notice -> getNoticeDto(null, notice))
			.collect(Collectors.toUnmodifiableList());
	}

	public NoticeDto getNoticeDto(UserDto userDto, Notice notice) {

		boolean isLike = false;

		if (userDto != null) {
			isLike = noticeLikeRepository.findByUser_IdAndNotice_Id(userDto.getId(), notice.getId())
				.orElse(NoticeLike.builder().state(1).build())
				.getState() == 0;
		}

		List<NoticeImg> imgList = noticeImgRepository.findByNotice_Id(notice.getId());

		return NoticeConverter.noticeConvertToDto(notice, imgList, isLike);
	}

	public Admin getAdmin(String token) {

		return adminRepository.findById(adminAuthService.findAdmin(token).getId())
			.orElseThrow(() -> new CustomException(ErrorCode.NO_AUTHORITY));
	}
}
