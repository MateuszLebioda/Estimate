package com.estimate.model.entities;

import com.estimate.model.entities.dto.ServiceEstimateDTO;
import com.estimate.model.entities.utils.Role;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity()
@DiscriminatorValue(value = Role.SERVICE_TITLE)
public class ServiceEstimate extends AbstractMaterialEstimate {

    public ServiceEstimateDTO toDTO() {
        return ServiceEstimateDTO.builder()
                .id(this.id)
                .name(this.name)
                .price(this.price)
                .sumPrice(this.sumPrice)
                .sumValue(this.sumValue)
                .unit(unit)
                .value(value)
                .build();
    }
}
