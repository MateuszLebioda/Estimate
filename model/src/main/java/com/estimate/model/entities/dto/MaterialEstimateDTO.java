package com.estimate.model.entities.dto;

import com.estimate.model.entities.Unit;
import com.estimate.model.entities.utils.Role;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@NoArgsConstructor
public class MaterialEstimateDTO extends AbstractMaterialEstimateDTO {

    @Builder
    public MaterialEstimateDTO(Long id, String name, Unit unit, Double price, Double sumPrice, Double sumValue) {
        super(id, name, unit, price, sumPrice, sumValue);
        type = Role.MATERIAL;
    }

}
