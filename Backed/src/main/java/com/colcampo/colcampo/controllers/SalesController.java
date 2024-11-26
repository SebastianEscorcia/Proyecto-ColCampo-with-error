package com.colcampo.colcampo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.colcampo.colcampo.DTOS.SaleDTO;
import com.colcampo.colcampo.services.SalesService;

@RestController
@RequestMapping("/api/sales")
public class SalesController {
    @Autowired
    private SalesService saleService;

    /**
     * Procesa la venta recibida desde el frontend.
     * 
     * @param sales Lista de ventas (SaleDTO) enviada desde el cliente.
     * @return Respuesta indicando el resultado de la operación.
     */
    @PostMapping
    public ResponseEntity<String> processSale(@RequestBody List<SaleDTO> sales) {
        try {
            saleService.processSale(sales);
            return ResponseEntity.ok("Venta procesada exitosamente.");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error al procesar la venta: " + e.getMessage());
        }
    }
}
