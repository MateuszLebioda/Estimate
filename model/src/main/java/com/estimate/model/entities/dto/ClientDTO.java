package com.estimate.model.entities.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ClientDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String city;
    private String street;
    private String houseNumber;
    private String phoneNumber;
    private String code;
    private Long user;
    private Boolean actual;
}
