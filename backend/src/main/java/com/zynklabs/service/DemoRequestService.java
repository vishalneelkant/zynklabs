package com.zynklabs.service;

import com.zynklabs.dto.BookDemoDTO;
import com.zynklabs.dto.BookDemoResponse;
import com.zynklabs.entity.DemoRequest;
import com.zynklabs.repository.DemoRequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class DemoRequestService {

    private final DemoRequestRepository demoRequestRepository;

    @Transactional
    public BookDemoResponse saveDemoRequest(BookDemoDTO bookDemoDTO) {
        DemoRequest demoRequest = new DemoRequest();
        demoRequest.setName(bookDemoDTO.getName());
        demoRequest.setEmail(bookDemoDTO.getEmail());
        demoRequest.setCompany(bookDemoDTO.getCompany());
        demoRequest.setPreferredDate(bookDemoDTO.getPreferredDate());
        demoRequest.setNotes(bookDemoDTO.getNotes());
        demoRequest.setStatus(DemoRequest.DemoStatus.PENDING);

        DemoRequest savedRequest = demoRequestRepository.save(demoRequest);

        return new BookDemoResponse(
            true,
            savedRequest.getId(),
            savedRequest.getPreferredDate()
        );
    }
}

