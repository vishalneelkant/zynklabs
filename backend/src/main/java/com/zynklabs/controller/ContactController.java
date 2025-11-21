package com.zynklabs.controller;

import com.zynklabs.dto.ContactDTO;
import com.zynklabs.dto.ContactResponse;
import com.zynklabs.service.ContactService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class ContactController {

    private final ContactService contactService;

    @PostMapping("/contact")
    public ResponseEntity<ContactResponse> submitContact(@Valid @RequestBody ContactDTO contactDTO) {
        ContactResponse response = contactService.saveContact(contactDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}

