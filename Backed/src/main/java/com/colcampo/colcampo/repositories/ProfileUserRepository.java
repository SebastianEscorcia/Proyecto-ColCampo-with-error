package com.colcampo.colcampo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.colcampo.colcampo.models.ProfilelUser;

@Repository
public interface ProfileUserRepository  extends JpaRepository<ProfilelUser, Integer> {

}
