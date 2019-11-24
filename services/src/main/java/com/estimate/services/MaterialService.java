package com.estimate.services;

import com.estimate.model.entities.AbstractMaterial;
import com.estimate.model.entities.Material;
import com.estimate.model.entities.User;
import com.estimate.model.entities.Works;
import com.estimate.model.entities.dto.MaterialDTO;


import javax.ejb.Local;
import java.util.List;
import java.util.Optional;

@Local
public interface MaterialService {
    Long addMaterial(AbstractMaterial material);
    Long addMaterialFromDTO(MaterialDTO materialDto);
    List<Material> getAllMaterials(User user);
    List<Works> getAllWorks(User user);
    Optional<Material> getMaterialById(Long id);
    boolean isMyMaterial(User user, Long materialId);
    boolean deleteMaterial(Material material);
    boolean isMyMaterial(User user, Material material);
    Long updateMaterial(Material material, MaterialDTO materialDTO);
    Material getMaterialFromDTO(MaterialDTO materialDTO);
    void mergeMaterialWithMaterialDTO(Material material, MaterialDTO materialDTO);
}
