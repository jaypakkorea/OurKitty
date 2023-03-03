package com.nyang.cat.dev.dishes.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.nyang.cat.dev.dishes.dto.DishDto;
import com.nyang.cat.dev.dishes.dto.DishLikeResultDto;
import com.nyang.cat.dev.dishes.repository.DishLikeRepository;
import com.nyang.cat.dev.dishes.repository.DishRepository;
import com.nyang.cat.dev.users.dto.UserDto;
import com.nyang.cat.dev.users.service.UserAuthService;
import com.nyang.cat.dev.util.converter.DishConverter;
import com.nyang.cat.domain.Dish;
import com.nyang.cat.domain.DishLike;
import com.nyang.cat.domain.User;
import com.nyang.cat.exception.common.CustomException;
import com.nyang.cat.exception.common.ObjectCrudException;
import com.nyang.cat.exception.constants.ErrorCode;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class DishLikeServiceImpl implements DishLikeService{


    private final UserAuthService userAuthSerivce;

    private final DishRepository dishRepository;

    private final DishLikeRepository dishLikeRepository;

    /**
     * 특정 냥그릇에 대해 좋아요 / 좋아요 취소
     * @param id    냥그릇 id
     * @param token user token
     * @return   냥그릇 id 와 like (0 : 좋아요 취소, 1 : 좋아요) 반환
     */
    @Transactional
    @Override
    public DishLikeResultDto addDishLike(Long id, String token) {
        UserDto userDto = userAuthSerivce.findUser(token,true);

        Optional<Dish> optionalDish = dishRepository.findById(id);

        //냥그릇이 존재하지 않으면
        if(optionalDish.isEmpty()){
            throw new ObjectCrudException(ErrorCode.NOT_FOUND_ENTITY, Dish.class);
        }
        Dish dish = optionalDish.get();
        DishLikeResultDto dishLikeResultDto = DishLikeResultDto
            .builder()
            .dishId(dish.getId())
            .like(null)
            .build();

        Optional<DishLike> optionalDishLike = dishLikeRepository.findDishLikeByDishAndUser_Id(dish, userDto.getId());

        //해당 냥그릇 id 에 대한 dishlike 가 이미 존재하면 좋아요 취소
        if(optionalDishLike.isPresent()) {
            dishLikeRepository.delete(optionalDishLike.get());
            dishLikeResultDto.setLike(0);
        }

        //아니면 좋아요
        else {
            DishLike dishLike = DishLike.builder()
                .dish(dish)
                .user(userDto.toEntity())
                .build();
            dishLikeRepository.save(dishLike);
            dishLikeResultDto.setLike(1);
        }

        return dishLikeResultDto;
    }

    /**
     * 유저가 좋아요한 냥그릇 반환
     * @param token     로그인 토큰
     * @return  좋아요한 냥그릇 리스트
     */
    @Override
    public List<DishDto> findLikeDishes(String token) {
        UserDto userDto = userAuthSerivce.findUser(token,true);

        List<DishDto> dishDtoList = new ArrayList<>();
        List<DishLike> dishLikeList = dishLikeRepository.findDishLikesByUser_Id(userDto.getId());

        for(DishLike dishLike : dishLikeList) {
            dishDtoList.add(DishConverter.dishConvertToDishInfoDto(dishLike.getDish()));
        }

        return dishDtoList;
    }

}
