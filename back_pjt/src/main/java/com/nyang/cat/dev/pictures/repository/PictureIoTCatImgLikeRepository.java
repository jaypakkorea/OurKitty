package com.nyang.cat.dev.pictures.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;

import com.nyang.cat.domain.IoTCatImg;
import com.nyang.cat.domain.IoTCatImgLike;
import com.nyang.cat.domain.User;

import java.util.Optional;

public interface PictureIoTCatImgLikeRepository extends JpaRepository<IoTCatImgLike, Long> {

	Slice<IoTCatImgLike> findSliceByUserAndState(Pageable pageable, User user, Integer state);

	Optional<IoTCatImgLike> findByIoTCatImgAndUser(IoTCatImg ioTCatImg, User user);

	Boolean existsByUserAndIoTCatImgAndState(User user, IoTCatImg ioTCatImg, Integer state);


	void deleteByIoTCatImg(IoTCatImg ioTCatImg);
}
