package com.estimate.model.entities;

import com.estimate.model.entities.utils.MaterialCategory;
import lombok.Data;

import javax.persistence.*;

import static javax.persistence.GenerationType.SEQUENCE;

@Table(name = "material")
@Entity
@Data
public class Material {

    @Id
    @GeneratedValue(strategy = SEQUENCE,generator = "material_seq")
    private Long id;

    @Column(name = "category")
    @Enumerated(EnumType.STRING)
    private MaterialCategory category;

    @Column(name = "name")
    private String name;

    @Column(name = "price")
    private Double price;

    @Column(name = "current")
    private Boolean current;
}
