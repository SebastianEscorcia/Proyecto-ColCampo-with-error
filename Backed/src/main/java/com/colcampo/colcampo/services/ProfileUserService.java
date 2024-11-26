package com.colcampo.colcampo.services;

import java.security.Key;
import java.util.Base64;
import java.util.Date;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.colcampo.colcampo.models.Person;
import com.colcampo.colcampo.repositories.PersonRepository;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Service
public class ProfileUserService {
    @Autowired
    private PersonRepository personRepository;

    private final byte[] secretKeyBytes = Base64.getDecoder().decode("717F0110C0801AB4318466ECC4AB4C08612C3AE9AF7FAC4215CE3E081CADD0C1");

    public Optional<String> login(String email, String password) {
        Optional<Person> person = personRepository.findByEmail(email);

        // Comparar contraseñas como texto plano
        if (person.isPresent() && person.get().getPassword().equals(password)) {
            String jwt = Jwts.builder()
                    .setSubject(person.get().getEmail())
                    .claim("id", person.get().getId())
                    .claim("name", person.get().getName())
                    .claim("perfil", person.get().getPerfil().getId()) 
                    .setIssuedAt(new Date())
                    .setExpiration(new Date(System.currentTimeMillis() + 86400000)) 
                    .signWith(SignatureAlgorithm.HS512, secretKeyBytes) // HS512 para firma simétrica
                    .compact();

            return Optional.of(jwt);
        }
        return Optional.empty();
    }
}
