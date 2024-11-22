package com.colcampo.colcampo.repositories;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.colcampo.colcampo.models.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    @Query("SELECT new map(per.id AS personId, per.name AS personName, rpp.stock AS stock, p.price AS price) " +
            "FROM RPersonProduct rpp " +
            "JOIN rpp.product p " +
            "JOIN rpp.person per " +
            "WHERE p.id = :productId")
    List<Map<String, Object>> findPersonProductsByProductId(@Param("productId") int productId);

}