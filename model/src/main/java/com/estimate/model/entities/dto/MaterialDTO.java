package com.estimate.model.entities.dto;


import com.estimate.model.entities.Unit;
import com.estimate.model.entities.User;
import com.estimate.model.entities.utils.Role;
import lombok.Data;

@Data
public class MaterialDTO extends AbstractMaterialDTO {
    public MaterialDTO() {
    }

    public MaterialDTO(Long id, String name, Double price, Unit unit, User user) {
        super(id,name,price,unit,user);
        setType(Role.MATERIAL);
    }
}
