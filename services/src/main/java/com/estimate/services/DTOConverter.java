package com.estimate.services;

import com.estimate.model.entities.AbstractMaterial;
import com.estimate.model.entities.JobTemplate;
import com.estimate.model.entities.JobTemplateAbstractMaterial;
import com.estimate.model.entities.dto.AbstractMaterialDTO;
import com.estimate.model.entities.dto.JobTemplateAbstractMaterialDTO;
import com.estimate.model.entities.dto.JobTemplateDTO;

import javax.ejb.Local;

@Local
public interface DTOConverter {
    JobTemplate makeJobTemplateFromDTO(JobTemplateDTO jobTemplateDTO);
    public JobTemplateAbstractMaterial makeJobTemplateAbstractMaterial(JobTemplateAbstractMaterialDTO jobTemplateAbstractMaterialDTO);
    AbstractMaterial makeAbstractMaterial(AbstractMaterialDTO abstractMaterialDTO);
}
