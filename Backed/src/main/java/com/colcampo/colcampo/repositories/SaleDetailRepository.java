package com.colcampo.colcampo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.colcampo.colcampo.models.SaleDetail;


public interface SaleDetailRepository extends JpaRepository<SaleDetail, Integer> {
    
}
