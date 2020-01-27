package com.estimate.model.entities.dto;

import com.estimate.model.entities.Unit;
import com.estimate.model.entities.User;
import com.estimate.model.entities.utils.Role;
import lombok.Data;

@Data
public class AbstractMaterialTemplateDTO {
    private Long id;
    private String name;
    private Double price;
    private Long unitId;
    private User user;
    private UnitDTO unit;
    private Role type;

    public AbstractMaterialTemplateDTO() {
    }

    public AbstractMaterialTemplateDTO(Long id, String name, Double price, Unit unit, User user) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.unitId = unit.getId();
        this.unit = unit.toDTO();
        this.user = getUser();
    }
}
