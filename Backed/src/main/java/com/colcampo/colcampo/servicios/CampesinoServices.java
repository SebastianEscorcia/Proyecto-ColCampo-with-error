package com.colcampo.colcampo.servicios;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.colcampo.colcampo.entidades.Campesino;
import com.colcampo.colcampo.entidades.Usuario;
import com.colcampo.colcampo.repositorios.CampesinoRepo;
import com.colcampo.colcampo.repositorios.UsuarioRepo;

@Service
public class CampesinoServices {
    @Autowired
    private CampesinoRepo repo;
    @Autowired
    private UsuarioRepo usuarioRepo;

    public Campesino save(Campesino campesino) {
        Optional<Usuario> existingUser = usuarioRepo.findByNombreUsuario(campesino.getNombreUsuario());
        if (existingUser.isPresent()) {
            // Usuario usuario = existingUser.get();

            // campesino.setId(usuario.getId());
            return repo.save(campesino);
        }
        return null;
    }

    public Campesino findById(int id) {
        return repo.findById(id).orElse(null);
    }

    public Campesino convertirEnCampesino(int usuarioId, Campesino nuevosDatos) {
        Usuario usuarioExistente = usuarioRepo.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        Campesino campesino = new Campesino();
        campesino.setId(usuarioExistente.getId());
        campesino.setNombreUsuario(usuarioExistente.getNombreUsuario());
        campesino.setContrasenia(usuarioExistente.getContrasenia());
        campesino.setCorreoElectronico(usuarioExistente.getCorreoElectronico());
        campesino.setNombre(nuevosDatos.getNombre());
        campesino.setApellido(nuevosDatos.getApellido());
        campesino.setDireccion(nuevosDatos.getDireccion());
        campesino.setNumeroDocumento(nuevosDatos.getNumeroDocumento());
        campesino.setFoto(nuevosDatos.getFoto());
        return repo.save(campesino);
    }
}
