package org.vaadin.example.service;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;
import org.springframework.stereotype.Service;
import org.vaadin.example.data.Contact;
import org.vaadin.example.data.ContactRepository;
import org.vaadin.example.data.ContactStatus;

import java.util.List;

@Service
@BrowserCallable
@AnonymousAllowed
public class ContactService {
    private final ContactRepository contactRepository;

    public ContactService(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    public List<Contact> findAll() {
        return contactRepository.findAll();
    }

    public Contact save(Contact contact) {
        return contactRepository.save(contact);
    }

    public void delete(Long id) {
        contactRepository.deleteById(id);
    }

    public void update(Contact contact) {
        contactRepository.save(contact);
    }

    public ContactStatus  getContactStatus() {
        ContactStatus contactStatus = new ContactStatus();
        List<Contact> contacts = contactRepository.findAll();
        for (Contact contact : contacts) {
            switch (contact.getStatus()) {
                case "Available":
                    contactStatus.setNumberOfAvailable(contactStatus.getNumberOfAvailable() + 1);
                    break;
                case "Busy":
                    contactStatus.setNumberOfBusy(contactStatus.getNumberOfBusy() + 1);
                    break;
                case "Away":
                    contactStatus.setNumberOfAway(contactStatus.getNumberOfAway() + 1);
                    break;
                case "Offline":
                    contactStatus.setNumberOfOffline(contactStatus.getNumberOfOffline() + 1);
                    break;
            }
        }
        return contactStatus;
    }
}
