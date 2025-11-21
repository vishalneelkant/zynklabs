package com.zynklabs.controller;

import com.zynklabs.dto.BookDemoDTO;
import com.zynklabs.dto.BookDemoResponse;
import com.zynklabs.service.DemoRequestService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class BookDemoController {

    private final DemoRequestService demoRequestService;

    @PostMapping("/book-demo")
    public ResponseEntity<BookDemoResponse> bookDemo(@Valid @RequestBody BookDemoDTO bookDemoDTO) {
        BookDemoResponse response = demoRequestService.saveDemoRequest(bookDemoDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}

