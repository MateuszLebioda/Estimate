package com.estimate.model.entities;

import com.estimate.model.entities.dto.MaterialEstimateDTO;
import com.estimate.model.entities.utils.Role;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity()
@DiscriminatorValue(value = Role.MATERIAL_TITLE)
public class MaterialEstimate extends AbstractMaterialEstimate {

    public MaterialEstimateDTO toDTO() {
        return MaterialEstimateDTO.builder()
                .id(this.id)
                .name(this.name)
                .price(this.price)
                .sumPrice(this.sumPrice)
                .sumValue(this.sumValue)
                .unit(unit)
                .build();
    }
}
