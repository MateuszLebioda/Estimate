package com.estimate.model.entities.dto;

import lombok.Data;

@Data
public class ClientDTO {

    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String city;
    private String street;
    private String houseNumber;
    private String code;
    private Long user;

    public ClientDTO() {
    }

    public ClientDTO(Long id, String firstName, String lastName, String email, String city, String street, String houseNumber, String code, Long user) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.city = city;
        this.street = street;
        this.houseNumber = houseNumber;
        this.code = code;
        this.user = user;
    }
}
