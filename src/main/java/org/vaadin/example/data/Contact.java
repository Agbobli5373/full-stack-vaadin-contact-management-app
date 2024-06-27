package org.vaadin.example.data;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

@Entity
public class Contact {
    @Id
    @GeneratedValue
    private Long id;

    @Size(min = 3, max = 50)
    private String name;

    @Email(message = "Please provide a valid email address")
    @NotBlank(message = "Please provide an email address")
    private String email;

    @Pattern(regexp = "^[0-9]*$")
    private String phone;

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    private String status;

    public Contact() {
    }

    public Contact(String name, String email, String phone, String status) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
}
