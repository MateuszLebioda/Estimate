package com.estimate.model.entities;

import com.estimate.model.entities.dto.JobTemplateAbstractMaterialDTO;
import com.estimate.model.entities.utils.SimpleEntity;
import lombok.Data;

import javax.persistence.*;

import static javax.persistence.GenerationType.SEQUENCE;

@Table(name = "workTemplate_abstract_material")
@Entity
@Data
public class JobTemplateAbstractMaterial implements SimpleEntity<JobTemplateAbstractMaterial> {

    @Id
    @GeneratedValue(strategy = SEQUENCE, generator = "workTemplate_abstract_material_seq")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "abstract_material_id")
    private AbstractMaterial abstractMaterial;

    @ManyToOne
    @JoinColumn(name = "workTemple")
    private JobTemplate workTemple;

    @Column(name = "value")
    private Double value;


    public JobTemplateAbstractMaterialDTO toDTO() {
        JobTemplateAbstractMaterialDTO jobTemplateAbstractMaterialDTO = new JobTemplateAbstractMaterialDTO();

        jobTemplateAbstractMaterialDTO.setMaterial(this.abstractMaterial instanceof Work ? ((Work) this.abstractMaterial).toDTO() : ((Material) this.abstractMaterial).toDTO());
        jobTemplateAbstractMaterialDTO.setValue(this.value);

        return jobTemplateAbstractMaterialDTO;
    }

    public void mergeWithDto(JobTemplateAbstractMaterialDTO clientDTO) {

    }
}
