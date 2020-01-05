package com.estimate.model.entities.utils;

import com.estimate.model.entities.AbstractMaterial;
import com.estimate.model.entities.Material;
import com.estimate.model.entities.Work;
import com.estimate.model.entities.dto.WorkTemplateAbstractMaterialDTO;
import lombok.Data;

import javax.persistence.*;

import static javax.persistence.GenerationType.SEQUENCE;

@Table(name = "workTemplate_abstract_material")
@Entity
@Data
public class WorkTemplateAbstractMaterial {

    @Id
    @GeneratedValue(strategy = SEQUENCE, generator = "workTemplate_abstract_material_seq")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "abstract_material_id", nullable = false)
    private AbstractMaterial abstractMaterial;

    @ManyToOne
    @JoinColumn(name = "workTemple", nullable = false)
    private WorkTemplate workTemple;

    @Column(name = "price")
    private Double price;


    public WorkTemplateAbstractMaterialDTO toDTO() {
        WorkTemplateAbstractMaterialDTO workTemplateAbstractMaterialDTO = new WorkTemplateAbstractMaterialDTO();

        workTemplateAbstractMaterialDTO.setMaterial(this.abstractMaterial instanceof Work ? ((Work) this.abstractMaterial).toDTO() : ((Material) this.abstractMaterial).toDTO());
        workTemplateAbstractMaterialDTO.setValue(this.price);

        return workTemplateAbstractMaterialDTO;
    }

    public void mergeWithDto(WorkTemplateAbstractMaterialDTO clientDTO) {

    }
}
