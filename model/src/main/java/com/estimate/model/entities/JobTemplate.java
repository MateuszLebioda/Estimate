package com.estimate.model.entities;

import com.estimate.model.entities.dto.JobTemplateDTO;
import com.estimate.model.entities.utils.SimpleEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static javax.persistence.GenerationType.SEQUENCE;

@Data
@Entity
@Table(name = "job_temple")
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class JobTemplate implements SimpleEntity<JobTemplate> {

    @Id
    @GeneratedValue(strategy = SEQUENCE, generator = "jobTemplate_seq")
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "jobTemplate", cascade = CascadeType.ALL)
    private List<JobTemplateAbstractMaterial> jobTemplateAbstractMaterial;

    @ManyToOne
    @JoinColumn(name = "unit_id", nullable = false)
    private Unit unit;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "is_template")
    private Boolean isTemplate;

    public JobTemplateDTO toDto() {
        return JobTemplateDTO.builder()
                .id(id)
                .name(name)
                .unit(unit.toDTO())
                .materials(
                        jobTemplateAbstractMaterial.stream()
                        .map(JobTemplateAbstractMaterial::toDTO)
                        .collect(Collectors.toList()))
                .build();
    }
}
