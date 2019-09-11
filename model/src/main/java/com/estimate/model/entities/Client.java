package com.estimate.model.entities;

import lombok.Data;
import javax.persistence.*;

import static javax.persistence.GenerationType.SEQUENCE;

@Data
@Entity
@Table(name = "client")
public class Client {

    @Id
    @GeneratedValue(strategy=SEQUENCE, generator="client_seq")
    @Column(name = "id")
    private Long id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "email")
    private String email;

    @Column(name = "city")
    private String city;

    @Column(name = "street")
    private String street;

    @Column(name = "number")
    private String houseNumber;

    @Column(name = "code")
    private String code;

    @ManyToOne
    @JoinColumn(name="user_id", nullable=false)
    private User user;

}
