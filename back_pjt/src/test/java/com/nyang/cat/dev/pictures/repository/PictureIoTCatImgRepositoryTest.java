package com.nyang.cat.dev.pictures.repository;

import java.util.List;
import java.util.Optional;

import com.nyang.cat.dev.admins.repository.AdminGroupRepository;
import com.nyang.cat.dev.dishes.repository.DishRepository;
import com.nyang.cat.dev.pictures.dto.PictureDto;
import com.nyang.cat.domain.AdminGroup;
import com.nyang.cat.domain.Dish;
import com.nyang.cat.domain.IoTCatImg;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.EmbeddedDatabaseConnection;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

// @AutoConfigureTestDatabase(connection = EmbeddedDatabaseConnection.H2)
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@DataJpaTest
public class PictureIoTCatImgRepositoryTest {

    @Autowired
    private AdminGroupRepository adminGroupRepository;
    @Autowired
    private DishRepository dishRepository;
    @Autowired
    private PictureIoTCatImgRepository repository;

    AdminGroup adminGroup;
    Dish dish;
    IoTCatImg ioTCatImg;

    @BeforeEach
    void init() {
        // 목업 생성
        adminGroup = AdminGroup.builder()
            .groupName("testgroup")
            .build();
        adminGroupRepository.save(adminGroup);

        dish = Dish.builder()
            .adminGroup(adminGroup)
            .build();
        dishRepository.save(dish);

        PictureDto pictureDto = PictureDto.builder()
            .dish(dish)
            .imgUrl("test1.png")
            .build();
        ioTCatImg = pictureDto.toEntity();
        repository.save(ioTCatImg);
    }

    @Test
    public void addPicture() throws Exception {
        PictureDto pictureDto = PictureDto.builder()
            .dish(dish)
            .imgUrl("test2.png")
            .build();
        IoTCatImg entity = pictureDto.toEntity();
        IoTCatImg result = repository.save(entity);

        Assertions.assertEquals(2L, result.getId());
        Assertions.assertEquals("test2.png", result.getImgUrl());
    }

    @Test
    public void modifyPicture() throws Exception {
        String origin = ioTCatImg.getImgUrl();
        Dish dish = ioTCatImg.getDish();
        System.out.println("출력: " + origin);
        System.out.println("출력: " + dish);

        IoTCatImg ioTCatImg1 = IoTCatImg.builder()
            .id(ioTCatImg.getId())
            .dish(dish)
            .imgUrl("test3.jpg")
            .build();

        repository.save(ioTCatImg1);

        Assertions.assertEquals(ioTCatImg1.getImgUrl(), ioTCatImg.getImgUrl());
        Assertions.assertEquals("test3.jpg", ioTCatImg1.getImgUrl());
        Assertions.assertEquals(ioTCatImg.getDish(),ioTCatImg1.getDish());
        Assertions.assertEquals(ioTCatImg.getId(),ioTCatImg1.getId());
    }

    @Test
    public void deletePicture() throws Exception {
        repository.deleteById(ioTCatImg.getId());

        Optional<IoTCatImg> result = repository.findById(ioTCatImg.getId());
        Assertions.assertNull(result);
        System.out.println("출력!!! " + result);
    }

}
