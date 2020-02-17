package com.estimate.services;

import com.estimate.dao.services.dao.AbstractMaterialDao;
import com.estimate.dao.services.dao.JobTemplateDao;
import com.estimate.model.entities.*;
import com.estimate.model.entities.dto.AbstractMaterialTemplateDTO;
import com.estimate.model.entities.dto.MaterialTemplateDTO;
import com.estimate.model.entities.dto.ServiceTempleDTO;
import com.estimate.model.entities.dto.UnitDTO;
import com.estimate.model.entities.utils.Role;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.transaction.Transactional;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Stateless(name = "materialService")
public class MaterialServiceImpl implements MaterialService {

    @EJB
    private AbstractMaterialDao abstractMaterialDao;

    @EJB
    private JobTemplateDao jobTemplateDao;

    @EJB
    private UnitService unitService;

    @EJB
    private MaterialService materialService;



    @Override
    @Transactional
    public boolean deleteAbstractMaterial(Long id) {
        Optional<AbstractMaterialTemplate> optionalAbstractMaterial = abstractMaterialDao.getAbstractMaterialById(id);
        if (optionalAbstractMaterial.isPresent()) {
            AbstractMaterialTemplate materialTemplate = optionalAbstractMaterial.get();
            if(materialTemplate.getJobTemplateAbstractMaterial().isEmpty()){
                abstractMaterialDao.delete(optionalAbstractMaterial.get());
                return true;
            }
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

    @Override
    public List<AbstractMaterialTemplateDTO> getAllMaterialsDTO(User user) {
        return prepareAbstractMaterialList(abstractMaterialDao.getAllMaterials(user));
    }

    @Override
    public List<AbstractMaterialTemplateDTO> getHideMaterials(User user) {
        return prepareAbstractMaterialList(abstractMaterialDao.getHideMaterials(user));
    }

    @Override
    public List<AbstractMaterialTemplateDTO> getDisplayedMaterials(User user) {
        return prepareAbstractMaterialList(abstractMaterialDao.getDisplayMaterials(user));
    }

    public List<AbstractMaterialTemplateDTO> getAllServicesDTO(User user){
        return prepareAbstractMaterialList(abstractMaterialDao.getAllServices(user));
    }

    @Override
    public List<AbstractMaterialTemplateDTO> getHideServices(User user) {
        return prepareAbstractMaterialList(abstractMaterialDao.getHideServices(user));
    }

    @Override
    public List<AbstractMaterialTemplateDTO> getDisplayedServices(User user) {
        return prepareAbstractMaterialList(abstractMaterialDao.getDisplayServices(user));
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
        material.setHidden(false);
        material.setUser(materialDTO.getUser());
        material.setCreateTime(LocalDateTime.now());
        material.setUnit(unitService.getUnitById(materialDTO.getUnit().getId()));
    }



    @Override
    public Optional<ServiceTemplate> getServiceById(Long id) {
        return abstractMaterialDao.getServiceById(id);
    }

    private List<AbstractMaterialTemplateDTO> prepareAbstractMaterialList(List<? extends AbstractMaterialTemplate> templates){
        return templates.stream()
                .sorted()
                .map(AbstractMaterialTemplate::toDTO).collect(Collectors.toList());
    }

    @Override
    public void displayAbstractMaterial(Long id) {
        editHide(id, false);
    }

    @Override
    public void hideAbstractMaterial(Long id) {
        editHide(id, true);
    }

    @Transactional
    private void editHide(Long id, boolean hide){
        AbstractMaterialTemplate material = abstractMaterialDao.getAbstractMaterialById(id).get();
        material.setHidden(hide);
        abstractMaterialDao.merge(material);
    }

}
