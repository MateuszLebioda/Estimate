package com.estimate.dao.services.impl;

import com.estimate.dao.services.dao.AbstractDao;
import com.estimate.dao.services.dao.JobTemplateDao;
import com.estimate.model.entities.JobTemplate;
import com.estimate.model.entities.User;
import com.sun.org.apache.xpath.internal.operations.Bool;

import javax.ejb.Stateless;
import javax.persistence.NoResultException;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Stateless(name = "jobTemplateDao")
public class JobTemplateDaoImpl extends AbstractDao<JobTemplate> implements JobTemplateDao {

    @Override
    public List<JobTemplate> getJobTemplatesByUser(User user) {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<JobTemplate> criteriaQuery = criteriaBuilder.createQuery(JobTemplate.class);
        Root<JobTemplate> root = criteriaQuery.from(JobTemplate.class);
        criteriaQuery.where(criteriaBuilder.and(
                criteriaBuilder.equal(root.get("user"),user)),
                criteriaBuilder.equal(root.get("isTemplate"), Boolean.TRUE));
        try {
            return new ArrayList<>(entityManager.createQuery(criteriaQuery).getResultList());
        }catch (NoResultException e){
            return Collections.emptyList();
        }
    }

    @Override
    public Optional<JobTemplate> getJobTemplateById(long id) {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<JobTemplate> criteriaQuery = criteriaBuilder.createQuery(JobTemplate.class);
        Root<JobTemplate> root = criteriaQuery.from(JobTemplate.class);
        criteriaQuery.where(criteriaBuilder.equal(root.get("id"),id));
        try {
            return Optional.of(entityManager.createQuery(criteriaQuery).getSingleResult());
        }catch (NoResultException e){
            return Optional.empty();
        }
    }
}
