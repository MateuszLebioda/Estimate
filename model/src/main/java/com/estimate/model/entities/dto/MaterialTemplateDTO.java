package com.estimate.model.entities.dto;


import com.estimate.model.entities.Unit;
import com.estimate.model.entities.User;
import com.estimate.model.entities.utils.Role;
import lombok.Data;

@Data
public class MaterialTemplateDTO extends AbstractMaterialTemplateDTO {
    public MaterialTemplateDTO() {
    }

    public MaterialTemplateDTO(Long id, String name, Double price, Unit unit, User user) {
        super(id,name,price,unit,user);
        setType(Role.MATERIAL);
    }
}
