package com.MyFacture.MyFacture.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "Client")
public class Client {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;
    private String phone;
    private String name;
    private String address;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    // ManyToOne relationship with Company entity
    @ManyToOne
    @JoinColumn(name = "company_id", referencedColumnName = "id", nullable = false)
    private User user;

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }


}
