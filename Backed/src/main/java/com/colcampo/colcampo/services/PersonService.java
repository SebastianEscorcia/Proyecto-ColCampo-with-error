package com.colcampo.colcampo.services;


import java.util.List;
import java.util.Optional;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.colcampo.colcampo.models.Person;
import com.colcampo.colcampo.models.ProfilelUser;
import com.colcampo.colcampo.repositories.PersonRepository;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.transaction.Transactional;

@Service
public class PersonService {
    @Autowired
    private PersonRepository personRepository;
    
    public List<Person> getAllPersons() {
        return personRepository.findAll();
    }
    
    public Person getPersonById(int id) {
        return personRepository.findById(id).orElse(null);
    }
    
    public Person saveOrUpdatePerson(Person person) {
        return personRepository.save(person);
    }
     private final String SECRET_KEY = "717F0110C0801AB4318466ECC4AB4C08612C3AE9AF7FAC4215CE3E081CADD0C1"; 

    @Transactional
    public String registerPerson(String name, String email, String password, int perfilId) throws IllegalArgumentException {
        Optional<Person> existingPerson = personRepository.findByEmail(email);
        if (existingPerson.isPresent()) {
            throw new IllegalArgumentException("El correo electrónico ya está registrado.");
        }

        Person newPerson = new Person();
        newPerson.setName(name);
        newPerson.setEmail(email);
        newPerson.setPassword(password); // Encriptar antes de guardar
        newPerson.setActive(true);
        newPerson.setCreatedAt(new java.sql.Timestamp(System.currentTimeMillis()));
        newPerson.setUpdatedAt(new java.sql.Timestamp(System.currentTimeMillis()));

        // Asignar perfil
        ProfilelUser perfil = new ProfilelUser();
        perfil.setId(perfilId);
        newPerson.setPerfil(perfil);

        personRepository.save(newPerson);

        // Generar JWT
        return generateToken(newPerson);
    }

    private String generateToken(Person person) {
        return Jwts.builder()
                .setSubject(person.getEmail())
                .claim("id", person.getId())
                .claim("name", person.getName())
                .claim("perfil", person.getPerfil().getName())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24)) // 24 horas
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
    }
    
}
