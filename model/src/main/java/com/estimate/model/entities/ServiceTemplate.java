package com.estimate.model.entities;

import com.estimate.model.entities.dto.ServiceTempleDTO;
import com.estimate.model.entities.utils.Role;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity()
@DiscriminatorValue(value = Role.SERVICE_TITLE)
public class ServiceTemplate extends AbstractMaterialTemplate {

    public ServiceTempleDTO toDTO() {
        return new ServiceTempleDTO(getId(),getName(),getPrice(),getUnit(),getUser());
    }
}

