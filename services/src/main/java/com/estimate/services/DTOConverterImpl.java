package com.estimate.services;

import com.estimate.model.entities.*;
import com.estimate.model.entities.dto.*;
import com.estimate.model.entities.utils.Role;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.inject.Inject;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.stream.Collectors;

@Stateless(name = "DTOConverter")
public class DTOConverterImpl implements DTOConverter {
    @Inject
    private Optional<User> user;

    @EJB
    private UnitService unitService;

    @EJB
    private MaterialService materialService;

    @EJB
    private ClientService clientService;

    @Override
    public JobTemplate makeJobTemplateFromDTO(JobTemplateDTO jobTemplateDTO) {
        return mergeJobTemplateFromDTO(new JobTemplate(), jobTemplateDTO);
    }

    @Override
    public JobTemplate mergeJobTemplateFromDTO(JobTemplate jobTemplate, JobTemplateDTO jobTemplateDTO) {
        jobTemplate.setName(jobTemplateDTO.getName());
        jobTemplate.setUnit(unitService.getUnitById(jobTemplateDTO.getUnit().getId()));
        jobTemplate.setUser(user.get());
        if (jobTemplateDTO.getId() != null) {
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
    public AbstractMaterialTemplate makeAbstractMaterialTemplate(AbstractMaterialTemplateDTO abstractMaterialTemplateDTO) {
        AbstractMaterialTemplate abstractMaterialTemplate = abstractMaterialTemplateDTO.getType() == Role.MATERIAL ? new MaterialTemplate() : new WorkTemplate();
        abstractMaterialTemplate.setName(abstractMaterialTemplateDTO.getName());
        abstractMaterialTemplate.setPrice(abstractMaterialTemplateDTO.getPrice());
        abstractMaterialTemplate.setUser(abstractMaterialTemplateDTO.getUser());
        abstractMaterialTemplate.setCreateTime(LocalDateTime.now());
        abstractMaterialTemplate.setUnit(unitService.getUnitById(abstractMaterialTemplateDTO.getUnit().getId()));
        return abstractMaterialTemplate;
    }


    @Override
    public AbstractMaterialEstimate makeAbstractMaterialEstimate(AbstractMaterialEstimateDTO abstractMaterialEstimateDTO) {
        AbstractMaterialEstimate abstractMaterialEstimate = abstractMaterialEstimateDTO.getType() == Role.MATERIAL ? new MaterialEstimate() : new WorkEstimate();
        abstractMaterialEstimate.setName(abstractMaterialEstimateDTO.getName());
        abstractMaterialEstimate.setId(abstractMaterialEstimateDTO.getId() != null && abstractMaterialEstimateDTO.getId() == 0 ? null : abstractMaterialEstimateDTO.getId());
        abstractMaterialEstimate.setPrice(abstractMaterialEstimateDTO.getPrice());
        abstractMaterialEstimate.setSumPrice(abstractMaterialEstimateDTO.getSumPrice());
        abstractMaterialEstimate.setSumValue(abstractMaterialEstimateDTO.getSumValue());
        abstractMaterialEstimate.setUnit(unitService.getUnitById(abstractMaterialEstimateDTO.getUnit().getId()));
        abstractMaterialEstimate.setUser(user.get());
        return abstractMaterialEstimate;
    }

    public JobTemplateEstimate makeJobTemplateEstimate(JobTemplateEstimateDTO jobTemplateEstimateDTO) {
        JobTemplateEstimate jobTemplateEstimate = new JobTemplateEstimate();
        jobTemplateEstimate.setId(jobTemplateEstimateDTO.getId() != null && jobTemplateEstimateDTO.getId() == 0 ? null : jobTemplateEstimateDTO.getId());
        jobTemplateEstimate.setValue(jobTemplateEstimateDTO.getValue());
        jobTemplateEstimate.setName(jobTemplateEstimateDTO.getName());
        jobTemplateEstimate.setSumPrice(jobTemplateEstimateDTO.getSumPrice());
        jobTemplateEstimate.setMaterials(jobTemplateEstimateDTO.getMaterials().stream().map(this::makeAbstractMaterialEstimate).collect(Collectors.toList()));
        jobTemplateEstimate.getMaterials().forEach(m -> m.setJobTemplate(jobTemplateEstimate));
        jobTemplateEstimate.setUnit(unitService.getUnitById(jobTemplateEstimateDTO.getUnit().getId()));
        jobTemplateEstimate.setUser(user.get());
        return jobTemplateEstimate;
    }


    public Estimate makeEstimate(EstimateDTO estimateDTO) {
        Estimate estimate = new Estimate();
        estimate.setId(estimate.getId());
        estimate.setName(estimateDTO.getName());
        estimate.setSumPrice(estimateDTO.getSumPrice());
        estimate.setJobTemplates(estimateDTO.getJobTemplates().stream().map(this::makeJobTemplateEstimate).collect(Collectors.toList()));
        estimate.getJobTemplates().forEach(j -> j.setEstimate(estimate));
        estimate.setMaterials(estimateDTO.getMaterials().stream().map(this::makeAbstractMaterialEstimate).collect(Collectors.toList()));
        estimate.getMaterials().forEach(m -> m.setEstimate(estimate));
        estimate.setClient(estimateDTO.getClient().getId() == null?null:clientService.getClientById(estimateDTO.getClient().getId()));
        estimate.setUser(user.get());
        return estimate;
    }

}
