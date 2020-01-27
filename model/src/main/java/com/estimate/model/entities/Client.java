package com.estimate.model.entities;

import com.estimate.model.entities.dto.ClientDTO;
import com.estimate.model.entities.utils.SimpleEntity;
import lombok.Data;
import javax.persistence.*;


import java.util.List;

import static javax.persistence.GenerationType.SEQUENCE;

@Data
@Entity
@Table(name = "client")
public class Client implements SimpleEntity<Client> {

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

    @Column(name = "isActual")
    private Boolean actual;

    @OneToMany(mappedBy = "client")
    private List<Estimate> estimate;

    @ManyToOne
    @JoinColumn(name="user_id", nullable=false)
    private User user;

    public ClientDTO toDTO(){
        return new ClientDTO(id,firstName,lastName,email,city,street,houseNumber,code,user.getId(), actual);
    }

    public void mergeWithDto(ClientDTO clientDTO){
        this.setFirstName(clientDTO.getFirstName());
        this.setLastName(clientDTO.getLastName());
        this.setCity(clientDTO.getCity());
        this.setStreet(clientDTO.getStreet());
        this.setEmail(clientDTO.getEmail());
        this.setCode(clientDTO.getCode());
        this.setHouseNumber(clientDTO.getHouseNumber());
    }
}
