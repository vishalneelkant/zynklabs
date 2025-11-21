package com.zynklabs.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.zynklabs.dto.ContactDTO;
import com.zynklabs.service.ContactService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ContactController.class)
class ContactControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ContactService contactService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void testSubmitContact_Success() throws Exception {
        ContactDTO contactDTO = new ContactDTO();
        contactDTO.setName("John Doe");
        contactDTO.setEmail("john@example.com");
        contactDTO.setCompany("Acme Corp");
        contactDTO.setMessage("Test message");

        UUID id = UUID.randomUUID();
        when(contactService.saveContact(any(ContactDTO.class)))
                .thenReturn(new com.zynklabs.dto.ContactResponse(true, id, LocalDateTime.now()));

        mockMvc.perform(post("/api/contact")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(contactDTO)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.id").exists());
    }

    @Test
    void testSubmitContact_ValidationError() throws Exception {
        ContactDTO contactDTO = new ContactDTO();
        // Missing required fields

        mockMvc.perform(post("/api/contact")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(contactDTO)))
                .andExpect(status().isBadRequest());
    }
}

