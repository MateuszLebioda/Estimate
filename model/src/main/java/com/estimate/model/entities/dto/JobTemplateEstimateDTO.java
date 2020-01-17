package com.estimate.model.entities.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JobTemplateEstimateDTO {
    private Long id;
    private String name;
    private UnitDTO unit;
    private Double value;
    private Double sumPrice;
    private List<AbstractMaterialEstimateDTO> materials;
}
