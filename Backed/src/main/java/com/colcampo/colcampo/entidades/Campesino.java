package com.colcampo.colcampo.entidades;

import org.antlr.v4.runtime.misc.NotNull;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Lob;

import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "campesino") 
@Getter
@Setter
public class Campesino extends Usuario {
    @SuppressWarnings("deprecation")
    @NotNull
    private String nombre;
    private String apellido;
    private String direccion;
    private String numeroDocumento;
    @Lob
    @Column(columnDefinition = "TEXT")
    private String foto; 
}


