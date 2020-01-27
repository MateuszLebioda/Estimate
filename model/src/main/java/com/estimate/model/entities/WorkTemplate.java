package com.estimate.model.entities;

import com.estimate.model.entities.dto.WorkTemplateDTO;
import com.estimate.model.entities.utils.Role;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity()
@DiscriminatorValue(value = Role.WORKS_TITLE)
public class WorkTemplate extends AbstractMaterialTemplate {

    public WorkTemplateDTO toDTO() {
        return new WorkTemplateDTO(getId(),getName(),getPrice(),getUnit(),getUser());
    }
}

