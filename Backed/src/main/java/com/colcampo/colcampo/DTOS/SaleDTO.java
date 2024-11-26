package com.colcampo.colcampo.DTOS;


import java.util.List; // Para manejar listas de objetos.
import lombok.AllArgsConstructor; // Para generar un constructor con todos los argumentos.
import lombok.Data; // Para generar getters, setters y otros métodos útiles.
import lombok.NoArgsConstructor; // Para generar un constructor sin argumentos.


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


