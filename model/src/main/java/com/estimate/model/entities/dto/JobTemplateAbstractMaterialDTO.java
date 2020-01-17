package com.estimate.model.entities.dto;

import lombok.Data;

@Data
public class JobTemplateAbstractMaterialDTO {
    AbstractMaterialTemplateDTO material;
    Double value;
}
