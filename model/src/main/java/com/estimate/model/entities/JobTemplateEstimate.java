package com.estimate.model.entities;

import com.estimate.model.entities.dto.JobTemplateEstimateDTO;
import com.estimate.model.entities.utils.SimpleEntity;
import lombok.Data;

import javax.persistence.*;

import java.util.List;
import java.util.stream.Collectors;

import static javax.persistence.GenerationType.SEQUENCE;

@Data
@Entity
@Table(name = "job_temple_estimate")
public class JobTemplateEstimate implements SimpleEntity<JobTemplate> {

    @Id
    @GeneratedValue(strategy = SEQUENCE, generator = "jobTemplate_estimate_seq")
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "value", columnDefinition = "Decimal(15,2)")
    private Double value;

    @Column(name = "sumPrice", columnDefinition = "Decimal(15,2)")
    private Double sumPrice;

    @ManyToOne
    @JoinColumn(name = "unit_id", nullable = false)
    private Unit unit;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @OneToMany(mappedBy = "jobTemplate", cascade = CascadeType.ALL)
    private List<AbstractMaterialEstimate> materials;

    @ManyToOne
    @JoinColumn(name = "estimate_id")
    private Estimate estimate;

    public JobTemplateEstimateDTO toDTO(){
        return JobTemplateEstimateDTO.builder()
                .id(this.id)
                .name(this.name)
                .unit(this.unit.toDTO())
                .value(this.value)
                .sumPrice(this.sumPrice)
                .materials(materials.stream().map(materials -> materials instanceof WorkEstimate? ((WorkEstimate)materials).toDTO():((MaterialEstimate)materials).toDTO()).collect(Collectors.toList()))
                .build();
    }

}
