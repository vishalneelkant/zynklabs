package com.zynklabs.service;

import com.zynklabs.dto.ContactDTO;
import com.zynklabs.dto.ContactResponse;
import com.zynklabs.entity.Contact;
import com.zynklabs.repository.ContactRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ContactService {

    private final ContactRepository contactRepository;

    @Transactional
    public ContactResponse saveContact(ContactDTO contactDTO) {
        Contact contact = new Contact();
        contact.setName(contactDTO.getName());
        contact.setEmail(contactDTO.getEmail());
        contact.setCompany(contactDTO.getCompany());
        contact.setMessage(contactDTO.getMessage());

        Contact savedContact = contactRepository.save(contact);

        // Mock email sending - log to console
        System.out.println("Email sent to: " + savedContact.getEmail() + " - Contact form submission received");

        return new ContactResponse(
            true,
            savedContact.getId(),
            savedContact.getCreatedAt()
        );
    }
}

