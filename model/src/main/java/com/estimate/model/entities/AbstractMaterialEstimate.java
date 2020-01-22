package com.estimate.model.entities;

import com.estimate.model.entities.utils.SimpleEntity;
import lombok.Data;

import javax.persistence.*;

import static javax.persistence.GenerationType.SEQUENCE;

@Table(name = "material_estimate")
@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "type")
@Data
public abstract class AbstractMaterialEstimate implements SimpleEntity<AbstractMaterialEstimate> {

    @Id
    @GeneratedValue(strategy = SEQUENCE,generator = "material_estimate_seq")
    protected Long id;

    @Column(name = "name")
    protected String name;

    @Column(name = "price", columnDefinition="Decimal(15,2)")
    protected Double price;

    @Column(name = "sum_price", columnDefinition="Decimal(15,2)")
    protected Double sumPrice;

    @Column(name = "sum_value", columnDefinition="Decimal(15,2)")
    protected Double sumValue;

    @ManyToOne
    @JoinColumn(name="user_id", nullable=false)
    protected User user;

    @ManyToOne
    @JoinColumn(name="unit_id", nullable=false)
    protected Unit unit;

    @ManyToOne
    @JoinColumn(name="estimate_id")
    protected Estimate estimate;

    @ManyToOne
    @JoinColumn(name="job_template_id")
    protected JobTemplateEstimate jobTemplate;
}
