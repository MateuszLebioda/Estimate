package com.estimate.dao.services.dao;


import com.estimate.model.entities.AbstractMaterial;
import com.estimate.model.entities.Material;
import com.estimate.model.entities.User;
import com.estimate.model.entities.Works;

import java.util.List;

public interface AbstractMaterialDao extends AbstractDaoFunction <AbstractMaterial>{
    List<Works> getAllWorks(User user);
    List<Material> getAllMaterials(User user);
}
