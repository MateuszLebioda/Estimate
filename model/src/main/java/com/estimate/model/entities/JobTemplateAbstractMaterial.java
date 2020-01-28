package com.estimate.model.entities;

import com.estimate.model.entities.dto.JobTemplateAbstractMaterialDTO;
import com.estimate.model.entities.utils.SimpleEntity;
import lombok.Data;

import javax.persistence.*;

import static javax.persistence.GenerationType.SEQUENCE;

@Table(name = "job_temple_abstract_material")
@Entity
@Data
public class JobTemplateAbstractMaterial implements SimpleEntity<JobTemplateAbstractMaterial> {

    @Id
    @GeneratedValue(strategy = SEQUENCE, generator = "jobTemplate_abstract_material_seq")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "abstract_material_id")
    private AbstractMaterialTemplate abstractMaterialTemplate;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "job_temple")
    private JobTemplate jobTemplate;

    @Column(name = "value")
    private Double value;

    public JobTemplateAbstractMaterialDTO toDTO() {
        JobTemplateAbstractMaterialDTO jobTemplateAbstractMaterialDTO = new JobTemplateAbstractMaterialDTO();

        jobTemplateAbstractMaterialDTO.setMaterial(this.abstractMaterialTemplate instanceof ServiceTemplate ? ((ServiceTemplate) this.abstractMaterialTemplate).toDTO() : ((MaterialTemplate) this.abstractMaterialTemplate).toDTO());
        jobTemplateAbstractMaterialDTO.setValue(this.value);

        return jobTemplateAbstractMaterialDTO;
    }
}
