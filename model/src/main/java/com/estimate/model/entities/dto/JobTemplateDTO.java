package com.estimate.model.entities.dto;

import lombok.Data;

import java.util.List;

@Data
public class JobTemplateDTO {
    Long id;
    String name;
    List<JobTemplateAbstractMaterialDTO> materials;
    UnitDTO unit;
}
