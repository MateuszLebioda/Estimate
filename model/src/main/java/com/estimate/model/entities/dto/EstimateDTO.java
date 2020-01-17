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
public class EstimateDTO {
    private String name;
    private List<WorkEstimateDTO> works;
    private List<MaterialEstimateDTO> materials;
    private List<JobTemplateEstimateDTO> jobTemplates;
}
