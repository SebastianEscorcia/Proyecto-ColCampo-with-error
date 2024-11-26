package com.colcampo.colcampo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.colcampo.colcampo.models.Person;
import com.colcampo.colcampo.repositories.PersonRepository;

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
    
}
