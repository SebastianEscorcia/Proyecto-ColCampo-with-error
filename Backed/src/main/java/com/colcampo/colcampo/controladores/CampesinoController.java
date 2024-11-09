package com.colcampo.colcampo.controladores;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
//import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.colcampo.colcampo.entidades.Campesino;
import com.colcampo.colcampo.servicios.CampesinoServices;

@RestController
@RequestMapping("/campesinos")
public class CampesinoController {

    @Autowired
    private CampesinoServices campesinoServices;

    @PostMapping("/registro")
    public ResponseEntity<?> save(@RequestBody Campesino campesino) {
        try {
            System.out.println("Datos recibidos: " + campesino.toString());
            Campesino savedCampesino = campesinoServices.save(campesino);
            if (savedCampesino != null) {
                return ResponseEntity.ok(savedCampesino);
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: Usuario no encontrado");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public Campesino findById(@PathVariable int id) {
        return campesinoServices.findById(id);
    }

   
}
