package com.estimate.model.entities;

import com.estimate.model.entities.dto.JobTemplateDTO;
import com.estimate.model.entities.utils.SimpleEntity;
import lombok.Data;

import javax.persistence.*;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static javax.persistence.GenerationType.SEQUENCE;

@Data
@Entity
@Table(name = "job_temple")
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


    public JobTemplateDTO toDto() {
        JobTemplateDTO jobTemplateDTO = new JobTemplateDTO();

        jobTemplateDTO.setId(id);
        jobTemplateDTO.setName(name);
        jobTemplateDTO.setUnit(unit.toDTO());
        jobTemplateDTO.setMaterials(jobTemplateAbstractMaterial.stream()
                .map(JobTemplateAbstractMaterial::toDTO).collect(Collectors.toList()));

        return jobTemplateDTO;
    }
}
