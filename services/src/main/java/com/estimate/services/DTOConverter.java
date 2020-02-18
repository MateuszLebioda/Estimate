package com.estimate.services;

import com.estimate.model.entities.*;
import com.estimate.model.entities.dto.*;

import javax.ejb.Local;

@Local
public interface DTOConverter {
    JobTemplate makeJobTemplateFromDTO(JobTemplateDTO jobTemplateDTO);
    JobTemplate mergeJobTemplateFromDTO(JobTemplate jobTemplate, JobTemplateDTO jobTemplateDTO);
    JobTemplateAbstractMaterial makeJobTemplateAbstractMaterial(JobTemplateAbstractMaterialDTO jobTemplateAbstractMaterialDTO);
    AbstractMaterialTemplate makeAbstractMaterialTemplate(AbstractMaterialTemplateDTO abstractMaterialTemplateDTO);
    AbstractMaterialEstimate makeAbstractMaterialEstimate(AbstractMaterialEstimateDTO abstractMaterialEstimateDTO);
    JobTemplateEstimate makeJobTemplateEstimate(JobTemplateEstimateDTO jobTemplateEstimateDTO);
    Estimate makeEstimate(EstimateDTO estimateDTO);
    Client makeClient(ClientDTO clientDTO);
}
