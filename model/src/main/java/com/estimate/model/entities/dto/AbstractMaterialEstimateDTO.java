package com.estimate.model.entities.dto;

import com.estimate.model.entities.Unit;
import com.estimate.model.entities.utils.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Value;
import lombok.experimental.SuperBuilder;
import net.bytebuddy.implementation.bind.annotation.Super;

@Data
@NoArgsConstructor
public class AbstractMaterialEstimateDTO {
    protected Long id;
    protected String name;
    protected UnitDTO unit;
    protected Double price;
    protected Double value;
    protected Role type;
    protected Double sumPrice;
    protected Double sumValue;

    public AbstractMaterialEstimateDTO(Long id, String name, Unit unit, Double price, Double sumPrice, Double sumValue, Double value) {
        this.id = id;
        this.name = name;
        this.unit = unit.toDTO();
        this.price = price;
        this.sumPrice = sumPrice;
        this.sumValue = sumValue;
        this.value = value;
    }
}
