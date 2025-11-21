package com.zynklabs.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.zynklabs.dto.BookDemoDTO;
import com.zynklabs.service.DemoRequestService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(BookDemoController.class)
class BookDemoControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private DemoRequestService demoRequestService;

    @Autowired
    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        objectMapper.registerModule(new JavaTimeModule());
    }

    @Test
    void testBookDemo_Success() throws Exception {
        BookDemoDTO bookDemoDTO = new BookDemoDTO();
        bookDemoDTO.setName("Jane Doe");
        bookDemoDTO.setEmail("jane@example.com");
        bookDemoDTO.setCompany("Tech Inc");
        bookDemoDTO.setPreferredDate(LocalDate.now().plusDays(7));
        bookDemoDTO.setNotes("Looking for AI automation");

        UUID id = UUID.randomUUID();
        when(demoRequestService.saveDemoRequest(any(BookDemoDTO.class)))
                .thenReturn(new com.zynklabs.dto.BookDemoResponse(true, id, LocalDate.now().plusDays(7)));

        mockMvc.perform(post("/api/book-demo")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(bookDemoDTO)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.id").exists());
    }

    @Test
    void testBookDemo_ValidationError() throws Exception {
        BookDemoDTO bookDemoDTO = new BookDemoDTO();
        // Missing required fields

        mockMvc.perform(post("/api/book-demo")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(bookDemoDTO)))
                .andExpect(status().isBadRequest());
    }
}

