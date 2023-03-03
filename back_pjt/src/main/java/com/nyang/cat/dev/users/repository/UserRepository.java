package com.nyang.cat.dev.users.repository;

import com.nyang.cat.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long> {
}
