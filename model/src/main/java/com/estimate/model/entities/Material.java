package com.estimate.model.entities;

import com.estimate.model.entities.dto.MaterialDTO;
import com.estimate.model.entities.utils.Role;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity()
@DiscriminatorValue(value = Role.MATERIAL_TITLE)
public class Material extends AbstractMaterial {

    public MaterialDTO toDTO(){
        return new MaterialDTO(getId(),getName(),getPrice(),getUnit(),getUser());
    }
}
