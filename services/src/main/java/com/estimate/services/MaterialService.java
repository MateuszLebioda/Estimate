package com.estimate.services;

import com.estimate.model.entities.AbstractMaterialTemplate;
import com.estimate.model.entities.MaterialTemplate;
import com.estimate.model.entities.User;
import com.estimate.model.entities.WorkTemplate;
import com.estimate.model.entities.dto.AbstractMaterialTemplateDTO;
import com.estimate.model.entities.dto.MaterialTemplateDTO;
import com.estimate.model.entities.dto.WorkTemplateDTO;


import javax.ejb.Local;
import java.util.List;
import java.util.Optional;

@Local
public interface MaterialService {
    Long addAbstractMaterial(AbstractMaterialTemplate material);
    Long addAbstractMaterialFromDTO(AbstractMaterialTemplateDTO abstractMaterialTemplateDTO);
    boolean deleteAbstractMaterial(AbstractMaterialTemplate abstractMaterialTemplate);
    Long updateAbstractMaterial(AbstractMaterialTemplateDTO abstractMaterialTemplateDTO);
    List<MaterialTemplate> getAllMaterials(User user);
    List<WorkTemplate> getAllWorks(User user);
    Optional<MaterialTemplate> getMaterialById(Long id);
    Optional<WorkTemplate> getWorkById(Long id);
    boolean isMyMaterial(User user, AbstractMaterialTemplate material);
    MaterialTemplate getMaterialFromDTO(MaterialTemplateDTO materialDTO);
    WorkTemplate getWorkFromDTO(WorkTemplateDTO workDTO);
    void mergeMaterialWithMaterialDTO(AbstractMaterialTemplate material, AbstractMaterialTemplateDTO materialDTO);
}
