package com.estimate.services;

import com.estimate.dao.services.dao.AbstractDao;
import com.estimate.dao.services.dao.AbstractMaterialDao;
import com.estimate.model.entities.AbstractMaterial;
import com.estimate.model.entities.Material;
import com.estimate.model.entities.User;
import com.estimate.model.entities.Works;

import javax.ejb.Stateless;

import java.util.List;

@Stateless(name = "materialService")
public class MaterialServiceImpl implements MaterialService {

    AbstractMaterialDao abstractMaterialDao;

    @Override
    public Long addMaterial(AbstractMaterial material) {
        return abstractMaterialDao.save(material).getId();
    }

    public List<Material> getAllMaterials(User user){
        return abstractMaterialDao.getAllMaterials(user);
    }

    @Override
    public List<Works> getAllWorks(User user) {
        return abstractMaterialDao.getAllWorks(user);
    }
}
