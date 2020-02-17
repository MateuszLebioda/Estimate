package com.estimate.dao.services.dao;


import com.estimate.model.entities.AbstractMaterialTemplate;
import com.estimate.model.entities.MaterialTemplate;
import com.estimate.model.entities.User;
import com.estimate.model.entities.ServiceTemplate;

import java.util.List;
import java.util.Optional;

public interface AbstractMaterialDao extends AbstractDaoFunction <AbstractMaterialTemplate>{
    List<ServiceTemplate> getAllServices(User user);
    List<MaterialTemplate> getAllMaterials(User user);
    List<MaterialTemplate> getHideMaterials(User user);
    List<ServiceTemplate> getHideServices(User user);
    List<MaterialTemplate> getDisplayMaterials(User user);
    List<ServiceTemplate> getDisplayServices(User user);
    Optional<MaterialTemplate> getMaterialById(Long id);
    Optional<ServiceTemplate> getServiceById(Long id);
    Optional<AbstractMaterialTemplate> getAbstractMaterialById(Long id);
}
