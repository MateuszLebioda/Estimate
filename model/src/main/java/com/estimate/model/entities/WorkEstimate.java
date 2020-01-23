package com.estimate.model.entities;

import com.estimate.model.entities.dto.WorkEstimateDTO;
import com.estimate.model.entities.utils.Role;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity()
@DiscriminatorValue(value = Role.WORKS_TITLE)
public class WorkEstimate extends AbstractMaterialEstimate {

    public WorkEstimateDTO toDTO() {
        return WorkEstimateDTO.builder()
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
