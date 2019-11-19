package com.estimate.services;

import com.estimate.model.entities.AbstractMaterial;
import com.estimate.model.entities.Material;
import com.estimate.model.entities.User;
import com.estimate.model.entities.Works;


import javax.ejb.Local;
import java.util.List;

@Local
public interface MaterialService {
    Long addMaterial(AbstractMaterial material);
    List<Material> getAllMaterials(User user);
    List<Works> getAllWorks(User user);
}
