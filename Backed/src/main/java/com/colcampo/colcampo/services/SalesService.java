package com.colcampo.colcampo.services;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.colcampo.colcampo.DTOS.PersonDTO;
import com.colcampo.colcampo.DTOS.SaleDTO;
import com.colcampo.colcampo.models.Person;
import com.colcampo.colcampo.models.Product;
import com.colcampo.colcampo.models.SaleDetail;
import com.colcampo.colcampo.models.Sales;
import com.colcampo.colcampo.repositories.PersonRepository;
import com.colcampo.colcampo.repositories.ProductPersonRepository;
import com.colcampo.colcampo.repositories.ProductRepository;
import com.colcampo.colcampo.repositories.SaleDetailRepository;
import com.colcampo.colcampo.repositories.SaleRepository;

import jakarta.transaction.Transactional;

@Service
public class SalesService {

    @Autowired
    private ProductPersonRepository productPersonRepository;

    @Autowired
    private SaleRepository salesRepository;

    @Autowired
    private SaleDetailRepository saleDetailRepository;

    @Autowired
    private PersonRepository personRepository;

    @Transactional
    public void processSale(List<SaleDTO> sales) {
        for (SaleDTO saleDTO : sales) {
            // Buscar las personas por ID (quemado)
            Person comprador = personRepository.findById(13)
                    .orElseThrow(() -> new RuntimeException("Comprador no encontrado."));
            Person campesino = personRepository.findById(12)
                    .orElseThrow(() -> new RuntimeException("Campesino no encontrado."));

            // Crear y guardar el registro de la venta
            Sales sale = new Sales();
            sale.setComprador(comprador);
            sale.setCampesino(campesino);
            sale.setCreatedAt(Timestamp.from(Instant.now()));
            sale.setUpdatedAt(Timestamp.from(Instant.now()));
            Sales savedSale = salesRepository.save(sale);

            for (PersonDTO person : saleDTO.getPersons()) {
                int rowsUpdated = productPersonRepository.discountStock(
                        person.getPersonId(),
                        saleDTO.getId(),
                        person.getQuantity());

                if (rowsUpdated == 0) {
                    throw new RuntimeException("Stock insuficiente para el producto: " + saleDTO.getName()
                            + ", Persona: " + person.getPersonName());
                }

                // Crear el detalle de la venta
                SaleDetail saleDetail = new SaleDetail();
                saleDetail.setSale(savedSale);

                // Crear relación con el producto
                Product product = new Product();
                product.setId(saleDTO.getId());
                saleDetail.setProduct(product);

                saleDetail.setQuantity(person.getQuantity());

                // Guardar el detalle de la venta
                saleDetailRepository.save(saleDetail);
            }
        }
    }
}
