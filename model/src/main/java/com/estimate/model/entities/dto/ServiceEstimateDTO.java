package com.estimate.model.entities.dto;

import com.estimate.model.entities.Unit;
import com.estimate.model.entities.utils.Role;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ServiceEstimateDTO extends AbstractMaterialEstimateDTO {

    @Builder
    public ServiceEstimateDTO(Long id, String name, Unit unit, Double price, Double sumPrice, Double sumValue, Double value) {
        super(id, name, unit, price, sumPrice, sumValue,value);
        type = Role.SERVICE;
    }
}
