package com.colcampo.colcampo.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.colcampo.colcampo.models.Person;

public interface PersonRepository extends JpaRepository<Person, Integer> {
    Optional<Person> findByEmail(String email);
}
