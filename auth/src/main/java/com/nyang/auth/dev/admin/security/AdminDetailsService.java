package com.nyang.auth.dev.admin.security;

import java.util.Optional;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.nyang.auth.dev.admin.repository.AdminRepository;
import com.nyang.auth.domain.Admin;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class AdminDetailsService implements UserDetailsService {

	private final AdminRepository adminRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		log.info("Service !!! ");

		Optional<Admin> adminOptional = adminRepository.findAdminByAdminEmail(username);

		if(adminOptional.isEmpty()) {
			throw new UsernameNotFoundException(username + " is not existed");
		}

		Admin admin = adminOptional.get();

		log.info("{}", admin);

		return new AdminDetails(admin);
	}
}
