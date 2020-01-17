package com.estimate.model.entities.dto;

import com.estimate.model.entities.utils.Role;
import lombok.Data;

@Data
public class MaterialEstimateDTO extends AbstractMaterialEstimateDTO {
    public MaterialEstimateDTO(){

    }

    public MaterialEstimateDTO(Long id, String name, UnitDTO unit, Double price, Role type, Double sumPrice, Double sumValue) {
        super(id, name, unit, price, type, sumPrice, sumValue);
        setType(Role.MATERIAL);
    }


}
