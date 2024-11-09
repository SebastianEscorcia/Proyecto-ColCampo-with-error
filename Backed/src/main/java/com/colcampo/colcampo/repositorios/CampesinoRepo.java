package com.colcampo.colcampo.repositorios;

import org.springframework.data.jpa.repository.JpaRepository;
import com.colcampo.colcampo.entidades.Campesino;

public interface CampesinoRepo extends JpaRepository<Campesino, Integer> {
    
}

