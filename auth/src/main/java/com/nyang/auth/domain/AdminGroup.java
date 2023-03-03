package com.nyang.auth.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import com.nyang.auth.domain.global.BaseEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class AdminGroup extends BaseEntity {

    @Id @GeneratedValue
    @Column(name = "group_id")
    private Long id;

    //@OneToMany(mappedBy = "group")
    //private List<AdminAlarm> adminAlarms = new ArrayList<>();

    private String groupName;
}
