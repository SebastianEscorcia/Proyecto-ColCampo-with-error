package com.colcampo.colcampo.controladores;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import com.colcampo.colcampo.entidades.Campesino;

import com.colcampo.colcampo.servicios.CampesinoServices;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/campesinos")
public class CampesinoController {

    @Autowired
    private CampesinoServices campesinoServices;

    @PostMapping("/perfil")
    public ResponseEntity<Campesino> registrarCampesino(@RequestBody Campesino campesino) {
        if (campesino.getUsuario().getCorreoElectronico() == null
                || campesino.getUsuario().getNombreUsuario() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Correo electrónico y nombre de usuario son obligatorios");
        }
        Campesino nuevoCampesino = campesinoServices.save(campesino);
        return ResponseEntity.ok(nuevoCampesino);
    }

    @GetMapping("/perfil/{id}")
    public ResponseEntity<Campesino> obtenerPerfilCampesino(@PathVariable int id) {
        Campesino campesino = campesinoServices.obtenerPerfil(id);
        return ResponseEntity.ok(campesino);

    }

    @PutMapping("/perfil/actualizar")
    public ResponseEntity<Campesino> actualizarPerfilCampesino(@RequestBody Map<String, Object> request) {
        ObjectMapper mapper = new ObjectMapper();
        Campesino campesino = mapper.convertValue(request, Campesino.class);
        Campesino actualizadoCampesino = campesinoServices.actualizarCampesino(campesino);
        return ResponseEntity.ok(actualizadoCampesino);
    }

}
