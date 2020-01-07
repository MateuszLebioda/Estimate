package com.estimate.services;

import com.estimate.model.entities.JobTemplate;
import com.estimate.model.entities.JobTemplateAbstractMaterial;
import com.estimate.model.entities.User;
import com.estimate.model.entities.dto.JobTemplateDTO;

import java.util.List;
import java.util.Optional;

public interface JobTemplateService {
    Long addJobTemplateDTO(JobTemplateDTO jobTemplate);
    List<JobTemplateDTO> getAllJobTemples(User user);
    Optional<JobTemplate> getJobTemplateById(long id);
    boolean isMyJobTemplate(User user, JobTemplate jobTemplate);
    boolean deleteJobTemplate(JobTemplate jobTemplate);
    JobTemplateDTO updateJobTemplate(JobTemplateDTO jobTemplateDTO);
    void deleteOldMaterials(List<JobTemplateAbstractMaterial> oldMaterials, List<JobTemplateAbstractMaterial> newMaterials);
}
