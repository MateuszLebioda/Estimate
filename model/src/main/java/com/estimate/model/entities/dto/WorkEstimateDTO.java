package com.estimate.model.entities.dto;

import com.estimate.model.entities.Unit;
import com.estimate.model.entities.utils.Role;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class WorkEstimateDTO extends AbstractMaterialEstimateDTO {

    @Builder
    public WorkEstimateDTO(Long id, String name, Unit unit, Double price, Double sumPrice, Double sumValue) {
        super(id, name, unit, price, sumPrice, sumValue);
        type = Role.WORK;
    }
}
