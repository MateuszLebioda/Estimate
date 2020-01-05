package com.estimate.model.entities.dto;

import lombok.Data;

import java.util.List;

@Data
public class WorkTemplateDTO {
    Long id;
    String name;
    List<WorkTemplateAbstractMaterialDTO> materials;
    UnitDTO unit;
}
