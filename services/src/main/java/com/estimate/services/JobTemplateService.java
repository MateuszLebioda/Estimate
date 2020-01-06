package com.estimate.services;

import com.estimate.model.entities.User;
import com.estimate.model.entities.dto.JobTemplateDTO;

import java.util.List;

public interface JobTemplateService {
    Long addJobTemplateDTO(JobTemplateDTO jobTemplate);
    List<JobTemplateDTO> getAllJobTemples(User user);
}
