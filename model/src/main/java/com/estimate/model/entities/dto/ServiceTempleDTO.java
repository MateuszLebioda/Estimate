package com.estimate.model.entities.dto;

import com.estimate.model.entities.Unit;
import com.estimate.model.entities.User;
import com.estimate.model.entities.utils.Role;
import lombok.Data;

@Data
public class ServiceTempleDTO extends AbstractMaterialTemplateDTO {
    public ServiceTempleDTO() {
    }

    public ServiceTempleDTO(Long id, String name, Double price, Unit unit) {
        super(id,name,price,unit);
        setType(Role.SERVICE);
    }
}
