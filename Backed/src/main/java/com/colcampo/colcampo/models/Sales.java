package com.colcampo.colcampo.models;

import java.sql.Timestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "sales")
@Getter
@Setter
public class Sales {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "comprador_id", nullable = false)
    private Person comprador;

    @ManyToOne
    @JoinColumn(name = "campesino_id", nullable = false)
    private Person campesino;
     @Column(name = "created_at", nullable = false, updatable = false)
    private Timestamp createdAt;
    @Column(name = "updated_at", nullable = false, updatable = false)
    private Timestamp updatedAt;
}