package com.colcampo.colcampo.controladores;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import com.colcampo.colcampo.entidades.Producto;
import com.colcampo.colcampo.entidades.JWT.AuthResponse;
import com.colcampo.colcampo.servicios.ProductoServices;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/producto")
public class ProductoController {
    @Autowired
    private ProductoServices productoServices;

    @PostMapping("/registro")
    public ResponseEntity<?> save(@RequestBody Producto producto) {
        System.out.println("Datos recibidos: " + producto.toString());
        if (productoServices.existerPorNombreOCodigo(producto.getNombre(), producto.getCodigoProducto())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(new AuthResponse("Ya has registrado un producto con este nombre o código"));
        }
        try {
            Producto guardarProducto = productoServices.save(producto);
            if (guardarProducto != null) {
                return ResponseEntity.ok(guardarProducto);
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al guardar el producto");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/obtener")
    public Iterable<Producto> findAll() {
        Iterable<Producto> productos = productoServices.findAll();
        System.out.println("Productos obtenidos: " + productos);
        return productos;
    }

    @GetMapping("/{codigo}")
    public Producto buscarPorCodigoProducto(@PathVariable String codigoProducto) {
        return productoServices.buscarPorCodigo(codigoProducto);
    }

}
