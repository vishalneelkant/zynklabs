package com.zynklabs.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ContactResponse {
    private boolean success;
    private UUID id;
    private LocalDateTime createdAt;
}

