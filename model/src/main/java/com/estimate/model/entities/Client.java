package com.estimate.model.entities;

import com.estimate.model.entities.dto.ClientDTO;
import com.estimate.model.entities.utils.SimpleEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.*;
import java.util.List;
import static javax.persistence.GenerationType.SEQUENCE;

@Data
@Entity
@Table(name = "client")
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Client implements SimpleEntity<Client> {

    @Id
    @GeneratedValue(strategy = SEQUENCE, generator = "client_seq")
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

    @Column(name = "phoneNumber")
    private String phoneNumber;

    @OneToMany(mappedBy = "client")
    private List<Estimate> estimate;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public ClientDTO toDTO() {
        return ClientDTO.builder()
                .id(id)
                .firstName(firstName)
                .lastName(lastName)
                .email(email)
                .city(city)
                .street(street)
                .houseNumber(houseNumber)
                .phoneNumber(phoneNumber)
                .code(code)
                .user(user.getId())
                .actual(actual)
                .build();
    }
}
