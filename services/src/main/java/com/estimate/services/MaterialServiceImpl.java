package com.estimate.services;

import com.estimate.dao.services.dao.AbstractMaterialDao;
import com.estimate.model.entities.*;
import com.estimate.model.entities.dto.AbstractMaterialTemplateDTO;
import com.estimate.model.entities.dto.MaterialTemplateDTO;
import com.estimate.model.entities.dto.ServiceTempleDTO;
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
    public boolean deleteAbstractMaterial(Long id) {
        Optional<AbstractMaterialTemplate> optionalAbstractMaterial = abstractMaterialDao.getAbstractMaterialById(id);
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
        if(abstractMaterialTemplateDTO.getType()==Role.SERVICE){
            abstractMaterial = materialService.getServiceById(abstractMaterialTemplateDTO.getId()).get();
        }else{
            abstractMaterial = materialService.getMaterialById(abstractMaterialTemplateDTO.getId()).get();
        }
        mergeMaterialWithMaterialDTO(abstractMaterial, abstractMaterialTemplateDTO);
        abstractMaterialDao.merge(abstractMaterial);
        return abstractMaterial.getId();

    }

    @Override
    public Long addAbstractMaterialFromDTO(AbstractMaterialTemplateDTO abstractMaterialTemplateDTO) {
        if (abstractMaterialTemplateDTO instanceof ServiceTempleDTO) {
            ServiceTemplate serviceTemplate = getServiceFromDTO((ServiceTempleDTO) abstractMaterialTemplateDTO);
            return abstractMaterialDao.save(serviceTemplate).getId();
        } else {
            MaterialTemplate material = getMaterialFromDTO((MaterialTemplateDTO) abstractMaterialTemplateDTO);
            return abstractMaterialDao.save(material).getId();
        }
    }

    public List<MaterialTemplate> getAllMaterials(User user) {
        return abstractMaterialDao.getAllMaterials(user);
    }

    @Override
    public List<ServiceTemplate> getAllServices(User user) {
        return abstractMaterialDao.getAllServices(user);
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
    public ServiceTemplate getServiceFromDTO(ServiceTempleDTO serviceTempleDTO) {
        ServiceTemplate serviceTemplate = new ServiceTemplate();
        mergeMaterialWithMaterialDTO(serviceTemplate, serviceTempleDTO);
        return serviceTemplate;
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
    public Optional<ServiceTemplate> getServiceById(Long id) {
        return abstractMaterialDao.getServiceById(id);
    }

}
