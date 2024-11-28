package com.colcampo.colcampo.DTOS;


import java.util.List; 
import lombok.AllArgsConstructor; 
import lombok.Data; 
import lombok.NoArgsConstructor; 


@Data
@NoArgsConstructor
@AllArgsConstructor
public class SaleDTO {
    private int id;
    private String name;
    private String image;
    private Double price;
    private List<PersonDTO> persons;
}


