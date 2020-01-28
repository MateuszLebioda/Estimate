package com.estimate.services;

import com.estimate.model.entities.AbstractMaterialTemplate;
import com.estimate.model.entities.MaterialTemplate;
import com.estimate.model.entities.User;
import com.estimate.model.entities.ServiceTemplate;
import com.estimate.model.entities.dto.AbstractMaterialTemplateDTO;
import com.estimate.model.entities.dto.MaterialTemplateDTO;
import com.estimate.model.entities.dto.ServiceTempleDTO;


import javax.ejb.Local;
import java.util.List;
import java.util.Optional;

@Local
public interface MaterialService {
    Long addAbstractMaterialFromDTO(AbstractMaterialTemplateDTO abstractMaterialTemplateDTO);
    boolean deleteAbstractMaterial(Long id);
    Long updateAbstractMaterial(AbstractMaterialTemplateDTO abstractMaterialTemplateDTO);
    List<MaterialTemplate> getAllMaterials(User user);
    List<ServiceTemplate> getAllServices(User user);
    Optional<MaterialTemplate> getMaterialById(Long id);
    Optional<ServiceTemplate> getServiceById(Long id);
    boolean isMyMaterial(User user, AbstractMaterialTemplate material);
    MaterialTemplate getMaterialFromDTO(MaterialTemplateDTO materialDTO);
    ServiceTemplate getServiceFromDTO(ServiceTempleDTO serviceTempleDTO);
    void mergeMaterialWithMaterialDTO(AbstractMaterialTemplate material, AbstractMaterialTemplateDTO materialDTO);
}
