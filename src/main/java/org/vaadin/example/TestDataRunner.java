package org.vaadin.example;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.vaadin.example.data.Contact;
import org.vaadin.example.service.ContactService;

import java.util.stream.IntStream;

@Component
public class TestDataRunner implements CommandLineRunner {

    private final ContactService contactService;

    public TestDataRunner(ContactService contactService) {
        this.contactService = contactService;
    }

    String[] status = {"Available", "Busy", "Away", "Offline"};

    @Override
    public void run(String... args) throws Exception {
        if(!contactService.findAll().isEmpty()) {
            return;
        }
        // Generate 10 instances of Contact
        IntStream.range(0, 10).forEach(i -> {
            String name = "Test Name " + i;
            String email = "test" + i + "@email.com";
            String phone = "1234567890" + i;
            String status = this.status[i % 4];
            contactService.save(new Contact(name, email, phone, status));
        });
    }
}