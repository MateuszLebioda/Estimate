package com.estimate.services;

import com.estimate.model.entities.*;
import com.estimate.model.entities.dto.AbstractMaterialDTO;
import com.estimate.model.entities.dto.JobTemplateAbstractMaterialDTO;
import com.estimate.model.entities.dto.JobTemplateDTO;
import com.estimate.model.entities.utils.Role;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.inject.Inject;
import java.time.LocalDateTime;
import java.util.Optional;

@Stateless(name = "DTOConverter")
public class DTOConverterImpl implements DTOConverter {
    @Inject
    private Optional<User> user;

    @EJB
    private UnitService unitService;

    @EJB
    private MaterialService materialService;

    @Override
    public JobTemplate makeJobTemplateFromDTO(JobTemplateDTO jobTemplateDTO) {
       return mergeJobTemplateFromDTO(new JobTemplate(), jobTemplateDTO);
    }

    @Override
    public JobTemplate mergeJobTemplateFromDTO(JobTemplate jobTemplate, JobTemplateDTO jobTemplateDTO) {
        jobTemplate.setName(jobTemplateDTO.getName());
        jobTemplate.setUnit(unitService.getUnitById(jobTemplateDTO.getUnit().getId()));
        jobTemplate.setUser(user.get());
        if(jobTemplateDTO.getId()!=null){
            jobTemplate.setId(jobTemplateDTO.getId());
        }
        return jobTemplate;
    }

    @Override
    public JobTemplateAbstractMaterial makeJobTemplateAbstractMaterial(JobTemplateAbstractMaterialDTO jobTemplateAbstractMaterialDTO) {
        JobTemplateAbstractMaterial jobTemplateAbstractMaterial = new JobTemplateAbstractMaterial();

        jobTemplateAbstractMaterial.setValue(jobTemplateAbstractMaterialDTO.getValue());
        jobTemplateAbstractMaterial.setAbstractMaterial(
                jobTemplateAbstractMaterialDTO.getMaterial().getType() == Role.MATERIAL ?
                        materialService.getMaterialById(jobTemplateAbstractMaterialDTO.getMaterial().getId()).get() :
                        materialService.getWorkById(jobTemplateAbstractMaterialDTO.getMaterial().getId()).get());

        return jobTemplateAbstractMaterial;
    }

    @Override
    public AbstractMaterial makeAbstractMaterial(AbstractMaterialDTO abstractMaterialDTO) {
        AbstractMaterial abstractMaterial = abstractMaterialDTO.getType() == Role.MATERIAL ? new Material() : new Work();
        abstractMaterial.setName(abstractMaterialDTO.getName());
        abstractMaterial.setPrice(abstractMaterialDTO.getPrice());
        abstractMaterial.setUser(abstractMaterialDTO.getUser());
        abstractMaterial.setActual(Boolean.TRUE);
        abstractMaterial.setCreateTime(LocalDateTime.now());
        abstractMaterial.setUnit(unitService.getUnitById(abstractMaterialDTO.getUnit().getId()));
        return abstractMaterial;
    }

}
