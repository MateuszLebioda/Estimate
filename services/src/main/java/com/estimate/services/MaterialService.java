package com.estimate.services;

import com.estimate.model.entities.AbstractMaterial;
import com.estimate.model.entities.Material;
import com.estimate.model.entities.User;
import com.estimate.model.entities.Work;
import com.estimate.model.entities.dto.AbstractMaterialDTO;
import com.estimate.model.entities.dto.MaterialDTO;
import com.estimate.model.entities.dto.WorkDTO;


import javax.ejb.Local;
import java.util.List;
import java.util.Optional;

@Local
public interface MaterialService {
    Long addAbstractMaterial(AbstractMaterial material);
    Long addAbstractMaterialFromDTO(AbstractMaterialDTO abstractMaterialDTO);
    boolean deleteAbstractMaterial(AbstractMaterial abstractMaterial);
    Long updateAbstractMaterial(AbstractMaterialDTO abstractMaterialDTO);
    List<Material> getAllMaterials(User user);
    List<Work> getAllWorks(User user);
    Optional<Material> getMaterialById(Long id);
    Optional<Work> getWorkById(Long id);
    boolean isMyMaterial(User user, AbstractMaterial material);
    Material getMaterialFromDTO(MaterialDTO materialDTO);
    Work getWorkFromDTO(WorkDTO workDTO);
    void mergeMaterialWithMaterialDTO(AbstractMaterial material, AbstractMaterialDTO materialDTO);
}
