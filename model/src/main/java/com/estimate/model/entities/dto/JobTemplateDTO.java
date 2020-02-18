package com.estimate.model.entities.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class JobTemplateDTO {
    Long id;
    String name;
    List<JobTemplateAbstractMaterialDTO> materials;
    UnitDTO unit;
}
