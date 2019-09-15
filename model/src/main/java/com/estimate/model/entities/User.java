package com.estimate.model.entities;

import lombok.Data;

import javax.persistence.*;

import java.io.Serializable;
import java.util.List;
import java.util.Set;

import static javax.persistence.GenerationType.SEQUENCE;

@Data
@Entity
@Table(name = "user")
public class User implements SimpleDao {

    @Id
    @GeneratedValue(strategy=SEQUENCE, generator="user_seq")
    @Column(name = "id")
    private Long id;

    @Column(name = "keycloak_Id")
    private String keyCloakId;

   /* @OneToMany(mappedBy="user")
    private Set<Estimate> estimates;*/

    @OneToMany(fetch = FetchType.EAGER, mappedBy="user")
    private List<Client> clients;

}
