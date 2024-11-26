package com.colcampo.colcampo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.colcampo.colcampo.models.RPersonProduct;

import jakarta.transaction.Transactional;

public interface ProductPersonRepository extends JpaRepository<RPersonProduct, Integer> {
    @Query("UPDATE RPersonProduct pp SET pp.stock = pp.stock - :quantity WHERE pp.person.id = :personId AND pp.product.id = :productId AND pp.stock >= :quantity")
    @Modifying
    @Transactional
    int discountStock(@Param("personId") int personId, @Param("productId") int productId,
            @Param("quantity") int quantity);
}
