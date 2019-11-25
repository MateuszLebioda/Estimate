package com.estimate.services;

import com.estimate.model.entities.AbstractMaterial;
import com.estimate.model.entities.Material;
import com.estimate.model.entities.User;
import com.estimate.model.entities.Work;
import com.estimate.model.entities.dto.MaterialDTO;
import com.estimate.model.entities.dto.WorkDTO;


import javax.ejb.Local;
import java.util.List;
import java.util.Optional;

@Local
public interface MaterialService {
    Long addMaterial(AbstractMaterial material);
    Long addMaterialFromDTO(MaterialDTO materialDto);
    List<Material> getAllMaterials(User user);
    List<Work> getAllWorks(User user);
    Optional<Material> getMaterialById(Long id);
    boolean isMyMaterial(User user, AbstractMaterial material);
    boolean deleteMaterial(Material material);
    Long updateMaterial(Material material, MaterialDTO materialDTO);
    Material getMaterialFromDTO(MaterialDTO materialDTO);
    void mergeMaterialWithMaterialDTO(Material material, MaterialDTO materialDTO);
    Long addWorkFromDTO(WorkDTO workDTO);
    void mergeWorkWithWorkDTO(Work work, WorkDTO workDTO);
    Work getWorkFromDTO(WorkDTO workDTO);
    Optional<Work> getWorkById(Long id);
    boolean deleteWork(Work work);
}
