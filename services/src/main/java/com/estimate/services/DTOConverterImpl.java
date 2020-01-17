package com.estimate.services;

import com.estimate.model.entities.*;
import com.estimate.model.entities.dto.AbstractMaterialTemplateDTO;
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
        jobTemplateAbstractMaterial.setAbstractMaterialTemplate(
                jobTemplateAbstractMaterialDTO.getMaterial().getType() == Role.MATERIAL ?
                        materialService.getMaterialById(jobTemplateAbstractMaterialDTO.getMaterial().getId()).get() :
                        materialService.getWorkById(jobTemplateAbstractMaterialDTO.getMaterial().getId()).get());

        return jobTemplateAbstractMaterial;
    }

    @Override
    public AbstractMaterialTemplate makeAbstractMaterial(AbstractMaterialTemplateDTO abstractMaterialTemplateDTO) {
        AbstractMaterialTemplate abstractMaterialTemplate = abstractMaterialTemplateDTO.getType() == Role.MATERIAL ? new MaterialTemplate() : new WorkTemplate();
        abstractMaterialTemplate.setName(abstractMaterialTemplateDTO.getName());
        abstractMaterialTemplate.setPrice(abstractMaterialTemplateDTO.getPrice());
        abstractMaterialTemplate.setUser(abstractMaterialTemplateDTO.getUser());
        abstractMaterialTemplate.setCreateTime(LocalDateTime.now());
        abstractMaterialTemplate.setUnit(unitService.getUnitById(abstractMaterialTemplateDTO.getUnit().getId()));
        return abstractMaterialTemplate;
    }

}
