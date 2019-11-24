package com.estimate.model.entities;

import lombok.Data;

import javax.persistence.*;

import java.util.HashSet;
import java.util.Set;

import static javax.persistence.GenerationType.SEQUENCE;

@Table(name = "estimate")
@Entity
@Data
public class Estimate {

    @Id
    @GeneratedValue(strategy = SEQUENCE,generator = "estimate_seq")
    private Long id;

    @ManyToOne
    @JoinColumn(name="user_id", nullable=false)
    private User user;

    @ManyToMany()
    @JoinTable(name = "estimate_material",
            joinColumns = @JoinColumn(name = "estimate_id"),
            inverseJoinColumns = @JoinColumn(name = "material_id")
    )
    private Set<Material> materials = new HashSet<>();

}
