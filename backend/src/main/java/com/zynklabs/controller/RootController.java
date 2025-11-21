package com.zynklabs.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class RootController {

    @GetMapping("/")
    public ResponseEntity<Map<String, Object>> root() {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Zynk Labs API");
        response.put("version", "1.0.0");
        response.put("endpoints", Map.of(
            "health", "/api/health",
            "contact", "POST /api/contact",
            "bookDemo", "POST /api/book-demo"
        ));
        return ResponseEntity.ok(response);
    }
}

