package com.estimate.model.entities;

import com.estimate.model.entities.utils.SimpleEntity;
import lombok.Data;

import javax.persistence.*;

import java.time.LocalDateTime;
import java.util.Set;

import static javax.persistence.GenerationType.SEQUENCE;

@Table(name = "material_template")
@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "type")
@Data
public abstract class AbstractMaterialTemplate implements SimpleEntity<Client> {

    @Id
    @GeneratedValue(strategy = SEQUENCE,generator = "material_seq")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "price", columnDefinition="Decimal(15,2)")
    private Double price;

    @Column(name = "create_time")
    private LocalDateTime createTime;

    @ManyToOne
    @JoinColumn(name="user_id", nullable=false)
    private User user;

    @ManyToOne
    @JoinColumn(name="unit_id", nullable=false)
    private Unit unit;

    @OneToMany(mappedBy = "abstractMaterialTemplate", cascade = CascadeType.ALL)
    private Set<JobTemplateAbstractMaterial> jobTemplateAbstractMaterial;
}
