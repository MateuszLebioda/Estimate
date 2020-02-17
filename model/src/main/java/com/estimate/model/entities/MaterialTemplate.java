package com.estimate.model.entities;

import com.estimate.model.entities.dto.MaterialTemplateDTO;
import com.estimate.model.entities.utils.Role;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity()
@DiscriminatorValue(value = Role.MATERIAL_TITLE)
public class MaterialTemplate extends AbstractMaterialTemplate {

    @Override
    public MaterialTemplateDTO toDTO(){
        return new MaterialTemplateDTO(getId(),getName(),getPrice(),getUnit());
    }
}
