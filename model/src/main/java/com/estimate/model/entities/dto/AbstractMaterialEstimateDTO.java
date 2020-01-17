package com.estimate.model.entities.dto;

import com.estimate.model.entities.utils.Role;
import lombok.Data;

@Data
public class AbstractMaterialEstimateDTO {
    private Long id;
    private String name;
    private UnitDTO unit;
    private Double price;
    private Role type;
    private Double sumPrice;
    private Double sumValue;

    AbstractMaterialEstimateDTO(){

    }

    public AbstractMaterialEstimateDTO(Long id, String name, UnitDTO unit, Double price, Role type, Double sumPrice, Double sumValue) {
        this.id = id;
        this.name = name;
        this.unit = unit;
        this.price = price;
        this.type = type;
        this.sumPrice = sumPrice;
        this.sumValue = sumValue;
    }
}
