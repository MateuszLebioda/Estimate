package com.estimate.dao.services.dao;


import com.estimate.model.entities.AbstractMaterial;
import com.estimate.model.entities.Material;
import com.estimate.model.entities.User;
import com.estimate.model.entities.Work;

import java.util.List;
import java.util.Optional;

public interface AbstractMaterialDao extends AbstractDaoFunction <AbstractMaterial>{
    List<Work> getAllWorks(User user);
    List<Material> getAllMaterials(User user);
    Optional<Material> getMaterialById(Long id);
    Optional<Work> getWorkById(Long id);
}
