package com.colcampo.colcampo.DTOS;


import lombok.AllArgsConstructor; 
import lombok.Data; 
import lombok.NoArgsConstructor; 

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
