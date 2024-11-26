package com.colcampo.colcampo.DTOS;


import lombok.AllArgsConstructor; // Constructor con todos los argumentos.
import lombok.Data; // Getters y setters.
import lombok.NoArgsConstructor; // Constructor sin argumentos.

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PersonDTO {
    private String personName;
    private Double price;
    private int personId;
    private Integer stock;
    private int quantity;
}
