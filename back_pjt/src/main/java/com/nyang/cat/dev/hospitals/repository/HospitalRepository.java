package com.nyang.cat.dev.hospitals.repository;

import com.nyang.cat.domain.Hospital;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface HospitalRepository extends JpaRepository<Hospital, Long> {

    List<Hospital> findHospitalsByLatBetweenAndLonBetween(Double startLat, Double endLat, Double startLon, Double endLon);

    List<Hospital> findByGroup_Id(long groupId);

    Optional<Hospital> findHospitalByAddressAndHospitalName(String address, String hospitalName);
}
