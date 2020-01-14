package com.estimate.dao.services.dao;

import com.estimate.model.entities.JobTemplate;
import com.estimate.model.entities.User;

import javax.ejb.Local;
import java.util.List;
import java.util.Optional;

@Local
public interface JobTemplateDao extends AbstractDaoFunction <JobTemplate>{
    List<JobTemplate> getJobTemplatesByUser(User user);
    Optional<JobTemplate> getJobTemplateById(long id);
}
