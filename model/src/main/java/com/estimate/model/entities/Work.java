package com.estimate.model.entities;

import com.estimate.model.entities.dto.WorkDTO;
import com.estimate.model.entities.utils.Role;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity()
@DiscriminatorValue(value = Role.WORKS_TITLE)
public class Work extends AbstractMaterial {

    public WorkDTO toDTO() {
        return new WorkDTO(getId(),getName(),getPrice(),getUnit(),getUser());
    }
}

