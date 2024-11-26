package com.colcampo.colcampo.repositories;

import org.springframework.stereotype.Repository;


import com.colcampo.colcampo.models.Sales;

import org.springframework.data.jpa.repository.JpaRepository;


@Repository
public interface SaleRepository extends JpaRepository<Sales, Integer> {
    
}
