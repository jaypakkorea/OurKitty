package com.nyang.cat.dev.hospitals.dto;

import com.nyang.cat.domain.Hospital;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HospitalDto {

    private Long id;

    private String hospitalName;
    private String address;
    private double lat;
    private double lon;

    private String hospitalPhone;
    private int hospitalState;

       // public Hospital toEntity() {
       //     return Hospital.builder()
       //             .id(id)
       //             .hospitalName(hospitalName)
       //             .address(address)
       //             .otherNote(otherNote)
       //             .lat(lat)
       //             .lon(lon)
       //             .foodWeightChangeDate(foodWeightChangeDate)
       //             .loadAddress(loadAddress)
       //             .dishImg(dishImg)
       //             .dishState(dishState)
       //             .build();
       // }
}
