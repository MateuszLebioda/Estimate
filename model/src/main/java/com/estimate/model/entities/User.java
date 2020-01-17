package com.estimate.model.entities;

import com.estimate.model.entities.utils.SimpleEntity;
import lombok.Data;

import javax.persistence.*;

import java.util.List;

import static javax.persistence.GenerationType.SEQUENCE;

@Data
@Entity
@Table(name = "user")
public class User implements SimpleEntity {

    @Id
    @GeneratedValue(strategy=SEQUENCE, generator="user_seq")
    @Column(name = "id")
    private Long id;

    @Column(name = "keycloak_Id")
    private String keyCloakId;

    @OneToMany(fetch = FetchType.EAGER, mappedBy="user")
    private List<Client> clients;

    @OneToMany(mappedBy="user")
    private List<MaterialTemplate> materials;

    @OneToMany(mappedBy="user")
    private List<WorkTemplate> workTemplates;

    @OneToMany(mappedBy="user", cascade = {CascadeType.PERSIST})
    private List<Unit> unit;

    @OneToMany(mappedBy="user", cascade = {CascadeType.PERSIST})
    private List<JobTemplate> jobTemplates;
}
