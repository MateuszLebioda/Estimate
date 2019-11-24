package com.estimate.services;

import com.estimate.dao.services.dao.AbstractMaterialDao;
import com.estimate.model.entities.*;
import com.estimate.model.entities.dto.MaterialDTO;

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
    public Long addMaterial(AbstractMaterial material) {
        material.setCreateTime(LocalDateTime.now());
        return abstractMaterialDao.save(material).getId();
    }

    @Override
    public Long addMaterialFromDTO(MaterialDTO materialDto) {
        return addMaterial(getMaterialFromDTO(materialDto));
    }

    public List<Material> getAllMaterials(User user){
        return abstractMaterialDao.getAllMaterials(user);
    }

    @Override
    public List<Works> getAllWorks(User user) {
        return abstractMaterialDao.getAllWorks(user);
    }

    @Override
    public Optional<Material> getMaterialById(Long id) {
        return abstractMaterialDao.getMaterialById(id);
    }

    @Override
    public boolean isMyMaterial(User user, Long materialId) {
        Optional<Material> optionalMaterial = abstractMaterialDao.getMaterialById(materialId);
        return optionalMaterial.filter(material -> isMyMaterial(user, material)).isPresent();
    }

    @Override
    public boolean isMyMaterial(User user, Material material) {
        return material.getUser().getId().equals(user.getId());
    }

    @Override
    public Long updateMaterial(Material material, MaterialDTO materialDTO) {
        if(material.getEstimates().isEmpty()){
            mergeMaterialWithMaterialDTO(material,materialDTO);
            abstractMaterialDao.merge(material);
            return material.getId();
        }else {
            Long newMaterialId = addMaterialFromDTO(materialDTO);
            material.setActual(Boolean.FALSE);
            abstractMaterialDao.merge(material);
            return newMaterialId;
        }
    }

    @Override
    public Material getMaterialFromDTO(MaterialDTO materialDTO) {
        Material material = new Material();
        mergeMaterialWithMaterialDTO(material,materialDTO);
        return material;
    }

    @Override
    public void mergeMaterialWithMaterialDTO(Material material, MaterialDTO materialDTO) {
        material.setName(materialDTO.getName());
        material.setPrice(materialDTO.getPrice());
        material.setUser(materialDTO.getUser());
        material.setActual(Boolean.TRUE);
        material.setCreateTime(LocalDateTime.now());
        material.setUnit(unitService.getUnitById(materialDTO.getUnit().getId()));
    }

    @Override
    public boolean deleteMaterial(Material material) {
        Optional<Material> optionalMaterial = abstractMaterialDao.getMaterialById(material.getId());
        if(optionalMaterial.isPresent()){
            abstractMaterialDao.delete(optionalMaterial.get());
            return true;
        }return false;
    }
}
