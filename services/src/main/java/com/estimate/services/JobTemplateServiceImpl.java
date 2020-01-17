package com.estimate.services;

import com.estimate.dao.services.dao.JobTemplateAbstractMaterialDao;
import com.estimate.dao.services.dao.JobTemplateDao;
import com.estimate.model.entities.AbstractMaterial;
import com.estimate.model.entities.JobTemplate;
import com.estimate.model.entities.JobTemplateAbstractMaterial;
import com.estimate.model.entities.User;
import com.estimate.model.entities.dto.JobTemplateDTO;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Stateless(name = "jobTemplateServiceImpl")
public class JobTemplateServiceImpl implements JobTemplateService {

    @Inject
    private Optional<User> user;

    @EJB
    private JobTemplateAbstractMaterialDao jobTemplateAbstractMaterialDao;

    @EJB
    private DTOConverter DTOConverter;

    @EJB
    private JobTemplateDao jobTemplateDao;

    @Override
    public Long addJobTemplateDTO(JobTemplateDTO jobTemplateDTO) {
        JobTemplate jobTemplate = DTOConverter.makeJobTemplateFromDTO(jobTemplateDTO);
        jobTemplate.setIsTemplate(Boolean.TRUE);
        Long id = jobTemplateDao.save(jobTemplate).getId();
        List<JobTemplateAbstractMaterial> materials =
                jobTemplateDTO.getMaterials().stream()
                        .map(DTOConverter::makeJobTemplateAbstractMaterial).collect(Collectors.toList());
        for (JobTemplateAbstractMaterial material : materials) {
            material.setJobTemplate(jobTemplate);
            jobTemplateAbstractMaterialDao.merge(material);
        }
        return id;
    }

    @Override
    public List<JobTemplateDTO> getAllJobTemples(User user) {
        return jobTemplateDao.getJobTemplatesByUser(user).stream().map(JobTemplate::toDto).collect(Collectors.toList());
    }

    @Override
    public Optional<JobTemplate> getJobTemplateById(long id) {
        return jobTemplateDao.getJobTemplateById(id);
    }

    @Override
    public boolean isMyJobTemplate(User user, JobTemplate jobTemplate) {
        return jobTemplate.getUser().getId().equals(user.getId());
    }

    @Override
    public boolean deleteJobTemplate(JobTemplate jobTemplate) {
        Optional<JobTemplate> optionalJobTemplate = getJobTemplateById(jobTemplate.getId());
        if(optionalJobTemplate.isPresent()){
            jobTemplateDao.delete(optionalJobTemplate.get());
            return true;
        }return false;
    }

    @Override
    @Transactional
    public JobTemplateDTO updateJobTemplate(JobTemplateDTO jobTemplateDTO) {
        JobTemplate jobTemplate = getJobTemplateById(jobTemplateDTO.getId()).get();
        List<JobTemplateAbstractMaterial> oldMaterials = jobTemplate.getJobTemplateAbstractMaterial();

        DTOConverter.mergeJobTemplateFromDTO(jobTemplate,jobTemplateDTO);

        List<JobTemplateAbstractMaterial> materials = jobTemplateDTO.getMaterials().stream()
                .map(DTOConverter::makeJobTemplateAbstractMaterial).collect(Collectors.toList());

        for(JobTemplateAbstractMaterial material: materials){
            material.setJobTemplate(jobTemplate);
        }

        deleteOldMaterials(oldMaterials,materials);

        jobTemplate.setJobTemplateAbstractMaterial(materials);
        jobTemplateDao.merge(jobTemplate);
        return jobTemplate.toDto();
    }

    @Override
    public void deleteOldMaterials(List<JobTemplateAbstractMaterial> oldMaterials, List<JobTemplateAbstractMaterial> newMaterials) {
        boolean save;
        for (JobTemplateAbstractMaterial oldMaterial: oldMaterials){
            save = false;
            for(JobTemplateAbstractMaterial material: newMaterials){
                if (oldMaterial.getId().equals(material.getId())) {
                    jobTemplateAbstractMaterialDao.merge(oldMaterial);
                    save = true;
                    break;
                }
            }
            if(!save){
                jobTemplateAbstractMaterialDao.delete(oldMaterial);
            }
        }
    }

}
