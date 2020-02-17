package com.estimate.model.entities;

import com.estimate.model.entities.dto.AbstractMaterialTemplateDTO;
import com.estimate.model.entities.utils.SimpleEntity;
import lombok.Data;

import javax.persistence.*;

import java.time.LocalDateTime;
import java.util.List;

import static javax.persistence.GenerationType.SEQUENCE;

@Table(name = "material_template")
@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "type")
@Data
public abstract class AbstractMaterialTemplate implements SimpleEntity<Client>, Comparable<AbstractMaterialTemplate> {

    @Id
    @GeneratedValue(strategy = SEQUENCE, generator = "material_seq")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "price", columnDefinition = "Decimal(15,2)")
    private Double price;

    @Column(name = "create_time")
    private LocalDateTime createTime;

    @Column(name = "hidden", columnDefinition = "boolean default false")
    private Boolean hidden;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "unit_id", nullable = false)
    private Unit unit;

    @OneToMany(mappedBy = "abstractMaterialTemplate", cascade = CascadeType.ALL)
    private List<JobTemplateAbstractMaterial> jobTemplateAbstractMaterial;

    public abstract AbstractMaterialTemplateDTO toDTO();

    @Override
    public int compareTo(AbstractMaterialTemplate compareWith) {
        return getName().toLowerCase().compareTo(compareWith.getName().toLowerCase());
    }
}
