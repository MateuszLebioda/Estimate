package com.estimate.services;

import com.estimate.model.entities.AbstractMaterialTemplate;
import com.estimate.model.entities.JobTemplate;
import com.estimate.model.entities.JobTemplateAbstractMaterial;
import com.estimate.model.entities.dto.AbstractMaterialTemplateDTO;
import com.estimate.model.entities.dto.JobTemplateAbstractMaterialDTO;
import com.estimate.model.entities.dto.JobTemplateDTO;

import javax.ejb.Local;

@Local
public interface DTOConverter {
    JobTemplate makeJobTemplateFromDTO(JobTemplateDTO jobTemplateDTO);
    JobTemplate mergeJobTemplateFromDTO(JobTemplate jobTemplate, JobTemplateDTO jobTemplateDTO);
    public JobTemplateAbstractMaterial makeJobTemplateAbstractMaterial(JobTemplateAbstractMaterialDTO jobTemplateAbstractMaterialDTO);
    AbstractMaterialTemplate makeAbstractMaterial(AbstractMaterialTemplateDTO abstractMaterialTemplateDTO);
}
