package com.estimate.model.entities;

import lombok.Data;

import javax.persistence.*;

import java.util.Set;

import static javax.persistence.GenerationType.SEQUENCE;

@Data
@Entity
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy=SEQUENCE, generator="user_seq")
    @Column(name = "id")
    private Long id;

    @Column(name = "keycloak_Id")
    private String keyCloakId;

    @OneToMany(mappedBy="user")
    private Set<Estimate> estimates;

    @OneToMany(mappedBy="user")
    private Set<Client> clients;

}
