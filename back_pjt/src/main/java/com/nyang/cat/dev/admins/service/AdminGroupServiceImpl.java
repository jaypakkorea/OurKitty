package com.nyang.cat.dev.admins.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.nyang.cat.dev.admins.repository.AdminGroupRepository;
import com.nyang.cat.domain.AdminGroup;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class AdminGroupServiceImpl implements AdminGroupService{

	private final AdminGroupRepository adminGroupRepository;

	@Override
	public List<String> findAdminGroups() {

		return adminGroupRepository.findAll().stream().map(AdminGroup::getGroupName)
			.collect(Collectors.toList());

	}

}
