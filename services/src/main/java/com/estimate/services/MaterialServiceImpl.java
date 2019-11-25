package com.estimate.services;

import com.estimate.dao.services.dao.AbstractMaterialDao;
import com.estimate.model.entities.*;
import com.estimate.model.entities.dto.AbstractMaterialDTO;
import com.estimate.model.entities.dto.MaterialDTO;
import com.estimate.model.entities.dto.WorkDTO;

import javax.ejb.EJB;
import javax.ejb.Stateless;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Stateless(name = "materialService")
public class MaterialServiceImpl implements MaterialService {

    @EJB
    AbstractMaterialDao abstractMaterialDao;

    @EJB
    private UnitService unitService;

    @Override
    public Long addAbstractMaterial(AbstractMaterial material) {
        return abstractMaterialDao.save(material).getId();
    }

    @Override
    public boolean deleteAbstractMaterial(AbstractMaterial abstractMaterial) {
        Optional<AbstractMaterial> optionalAbstractMaterial = abstractMaterialDao.getAbstractMaterialById(abstractMaterial.getId());
        if(optionalAbstractMaterial.isPresent()){
            abstractMaterialDao.delete(optionalAbstractMaterial.get());
            return true;
        }return false;
    }

    @Override
    public Long updateAbstractMaterial(AbstractMaterial abstractMaterial, AbstractMaterialDTO abstractMaterialDTO) {
        if(abstractMaterial.getEstimates().isEmpty()){
            mergeMaterialWithMaterialDTO(abstractMaterial,abstractMaterialDTO);
            abstractMaterialDao.merge(abstractMaterial);
            return abstractMaterial.getId();
        }else {
            Long newMaterialId = addAbstractMaterialFromDTO(abstractMaterialDTO);
            abstractMaterial.setActual(Boolean.FALSE);
            abstractMaterialDao.merge(abstractMaterial);
            return newMaterialId;
        }
    }

    @Override
    public Long addAbstractMaterialFromDTO(AbstractMaterialDTO abstractMaterialDTO) {
        if(abstractMaterialDTO instanceof WorkDTO){
            Work work = getWorkFromDTO((WorkDTO) abstractMaterialDTO);
            return abstractMaterialDao.save(work).getId();
        }else {
            Material material = getMaterialFromDTO((MaterialDTO) abstractMaterialDTO);
            return abstractMaterialDao.save(material).getId();
        }
    }

    public List<Material> getAllMaterials(User user){
        return abstractMaterialDao.getAllMaterials(user);
    }

    @Override
    public List<Work> getAllWorks(User user) {
        return abstractMaterialDao.getAllWorks(user);
    }

    @Override
    public Optional<Material> getMaterialById(Long id) {
        return abstractMaterialDao.getMaterialById(id);
    }


    @Override
    public boolean isMyMaterial(User user, AbstractMaterial material) {
        return material.getUser().getId().equals(user.getId());
    }

    @Override
    public Material getMaterialFromDTO(MaterialDTO materialDTO) {
        Material material = new Material();
        mergeMaterialWithMaterialDTO(material, materialDTO);
        return material;
    }

    @Override
    public Work getWorkFromDTO(WorkDTO workDTO) {
        Work work = new Work();
        mergeMaterialWithMaterialDTO(work, workDTO);
        return work;
    }

    @Override
    public void mergeMaterialWithMaterialDTO(AbstractMaterial material, AbstractMaterialDTO materialDTO) {
        material.setName(materialDTO.getName());
        material.setPrice(materialDTO.getPrice());
        material.setUser(materialDTO.getUser());
        material.setActual(Boolean.TRUE);
        material.setCreateTime(LocalDateTime.now());
        material.setUnit(unitService.getUnitById(materialDTO.getUnit().getId()));
    }

    @Override
    public Optional<Work> getWorkById(Long id) {
        return abstractMaterialDao.getWorkById(id);
    }

}
