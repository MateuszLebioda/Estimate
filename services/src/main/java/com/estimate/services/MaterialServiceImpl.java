package com.estimate.services;

import com.estimate.dao.services.dao.AbstractMaterialDao;
import com.estimate.model.entities.*;
import com.estimate.model.entities.dto.AbstractMaterialTemplateDTO;
import com.estimate.model.entities.dto.MaterialTemplateDTO;
import com.estimate.model.entities.dto.WorkTemplateDTO;
import com.estimate.model.entities.utils.Role;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.transaction.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Stateless(name = "materialService")
public class MaterialServiceImpl implements MaterialService {

    @EJB
    AbstractMaterialDao abstractMaterialDao;

    @EJB
    private UnitService unitService;

    @EJB
    private MaterialService materialService;

    @Override
    public Long addAbstractMaterial(AbstractMaterialTemplate material) {
        return abstractMaterialDao.save(material).getId();
    }

    @Override
    public boolean deleteAbstractMaterial(AbstractMaterialTemplate abstractMaterialTemplate) {
        Optional<AbstractMaterialTemplate> optionalAbstractMaterial = abstractMaterialDao.getAbstractMaterialById(abstractMaterialTemplate.getId());
        if (optionalAbstractMaterial.isPresent()) {
            abstractMaterialDao.delete(optionalAbstractMaterial.get());
            return true;
        }
        return false;
    }

    @Override
    @Transactional
    public Long updateAbstractMaterial(AbstractMaterialTemplateDTO abstractMaterialTemplateDTO) {
        AbstractMaterialTemplate abstractMaterial;
        if(abstractMaterialTemplateDTO.getType()==Role.WORK){
            abstractMaterial = materialService.getWorkById(abstractMaterialTemplateDTO.getId()).get();
        }else{
            abstractMaterial = materialService.getMaterialById(abstractMaterialTemplateDTO.getId()).get();
        }
        mergeMaterialWithMaterialDTO(abstractMaterial, abstractMaterialTemplateDTO);
        abstractMaterialDao.merge(abstractMaterial);
        return abstractMaterial.getId();

    }

    @Override
    public Long addAbstractMaterialFromDTO(AbstractMaterialTemplateDTO abstractMaterialTemplateDTO) {
        if (abstractMaterialTemplateDTO instanceof WorkTemplateDTO) {
            WorkTemplate workTemplate = getWorkFromDTO((WorkTemplateDTO) abstractMaterialTemplateDTO);
            return abstractMaterialDao.save(workTemplate).getId();
        } else {
            MaterialTemplate material = getMaterialFromDTO((MaterialTemplateDTO) abstractMaterialTemplateDTO);
            return abstractMaterialDao.save(material).getId();
        }
    }

    public List<MaterialTemplate> getAllMaterials(User user) {
        return abstractMaterialDao.getAllMaterials(user);
    }

    @Override
    public List<WorkTemplate> getAllWorks(User user) {
        return abstractMaterialDao.getAllWorks(user);
    }

    @Override
    public Optional<MaterialTemplate> getMaterialById(Long id) {
        return abstractMaterialDao.getMaterialById(id);
    }


    @Override
    public boolean isMyMaterial(User user, AbstractMaterialTemplate material) {
        return material.getUser().getId().equals(user.getId());
    }

    @Override
    public MaterialTemplate getMaterialFromDTO(MaterialTemplateDTO materialDTO) {
        MaterialTemplate material = new MaterialTemplate();
        mergeMaterialWithMaterialDTO(material, materialDTO);
        return material;
    }

    @Override
    public WorkTemplate getWorkFromDTO(WorkTemplateDTO workDTO) {
        WorkTemplate workTemplate = new WorkTemplate();
        mergeMaterialWithMaterialDTO(workTemplate, workDTO);
        return workTemplate;
    }

    @Override
    public void mergeMaterialWithMaterialDTO(AbstractMaterialTemplate material, AbstractMaterialTemplateDTO materialDTO) {
        material.setName(materialDTO.getName());
        material.setPrice(materialDTO.getPrice());
        material.setUser(materialDTO.getUser());
        material.setCreateTime(LocalDateTime.now());
        material.setUnit(unitService.getUnitById(materialDTO.getUnit().getId()));
    }

    @Override
    public Optional<WorkTemplate> getWorkById(Long id) {
        return abstractMaterialDao.getWorkById(id);
    }

}
