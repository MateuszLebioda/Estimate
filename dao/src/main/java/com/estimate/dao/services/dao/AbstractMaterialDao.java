package com.estimate.dao.services.dao;


import com.estimate.model.entities.AbstractMaterialTemplate;
import com.estimate.model.entities.MaterialTemplate;
import com.estimate.model.entities.User;
import com.estimate.model.entities.WorkTemplate;

import java.util.List;
import java.util.Optional;

public interface AbstractMaterialDao extends AbstractDaoFunction <AbstractMaterialTemplate>{
    List<WorkTemplate> getAllWorks(User user);
    List<MaterialTemplate> getAllMaterials(User user);
    Optional<MaterialTemplate> getMaterialById(Long id);
    Optional<WorkTemplate> getWorkById(Long id);
    Optional<AbstractMaterialTemplate> getAbstractMaterialById(Long id);
}
