package com.estimate.services;

import com.estimate.dao.services.dao.AbstractMaterialDao;
import com.estimate.model.entities.AbstractMaterial;
import com.estimate.model.entities.Material;
import com.estimate.model.entities.User;
import com.estimate.model.entities.Works;
import com.estimate.model.entities.dto.MaterialDTO;
import com.sun.org.apache.xpath.internal.operations.Bool;

import javax.ejb.EJB;
import javax.ejb.Stateless;

import java.time.LocalDateTime;
import java.util.List;

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
        Material material = new Material();
        material.setName(materialDto.getName());
        material.setPrice(materialDto.getPrice());
        material.setUser(materialDto.getUser());
        material.setActual(Boolean.TRUE);
        material.setCreateTime(LocalDateTime.now());
        material.setUnit(unitService.getUnitById(materialDto.getUnitId()));
        return addMaterial(material);
    }

    public List<Material> getAllMaterials(User user){
        return abstractMaterialDao.getAllMaterials(user);
    }

    @Override
    public List<Works> getAllWorks(User user) {
        return abstractMaterialDao.getAllWorks(user);
    }
}
