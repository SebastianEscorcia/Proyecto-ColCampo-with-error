package com.colcampo.colcampo.controllers;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;

@RestController
@RequestMapping("/api/uploads")
public class ImageController {

    private final Path uploadPath = Paths.get("uploads");

    public ImageController() throws IOException {
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }
    }

    // Endpoint para obtener una imagen por su nombre
    @GetMapping("/{imageName}")
    public ResponseEntity<Resource> getImage(@PathVariable("imageName") String imageName) {
        try {
            Path imagePath = uploadPath.resolve(imageName).normalize();
            Resource resource = new UrlResource(imagePath.toUri());
            if (!resource.exists() || !resource.isReadable()) {
                System.err.println("Error: Archivo no encontrado o no legible " + imagePath);
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                    .header(HttpHeaders.CONTENT_TYPE, Files.probeContentType(imagePath)).body(resource);
        } catch (IOException e) {
            System.err.println("Error al obtener la imagen: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }

    // Endpoint para subir una imagen
    @PostMapping("/upload")
    public ResponseEntity<?> uploadImage(@RequestParam("file") MultipartFile file) {
        try {
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("error", "No se envió ninguna imagen."));
            }

            String fileName = file.getOriginalFilename();
            long fileSize = file.getSize();
            String fileType = file.getContentType();

            Path targetLocation = uploadPath.resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation);

            Map<String, Object> response = Map.of(
                    "fileName", fileName,
                    "fileSize", fileSize,
                    "fileType", fileType,
                    "message", "Imagen subida exitosamente");

            return ResponseEntity.ok(response);
        } catch (IOException e) {
            return ResponseEntity.status(500).body(Map.of("error", "Error al subir la imagen."));
        }
    }

    // Endpoint para eliminar una imagen
    @DeleteMapping("/{imageName}")
    public ResponseEntity<String> deleteImage(@PathVariable String imageName) {
        try {
            Path imagePath = uploadPath.resolve(imageName).normalize();
            File file = imagePath.toFile();

            if (file.exists() && file.delete()) {
                return ResponseEntity.ok("Imagen eliminada exitosamente: " + imageName);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error al eliminar la imagen.");
        }
    }
}