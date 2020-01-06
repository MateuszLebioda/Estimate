package com.estimate.dao.services.impl;

import com.estimate.dao.services.dao.AbstractDao;
import com.estimate.dao.services.dao.JobTemplateAbstractMaterialDao;
import com.estimate.model.entities.JobTemplateAbstractMaterial;

import javax.ejb.Stateless;
import javax.persistence.NoResultException;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;


@Stateless(name = "jobTemplateAbstractMaterialDao")
public class JobTemplateAbstractMaterialDaoImpl extends AbstractDao<JobTemplateAbstractMaterial> implements JobTemplateAbstractMaterialDao {
    @Override
    public JobTemplateAbstractMaterial xxx() {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<JobTemplateAbstractMaterial> criteriaQuery = criteriaBuilder.createQuery(JobTemplateAbstractMaterial.class);
        Root<JobTemplateAbstractMaterial> root = criteriaQuery.from(JobTemplateAbstractMaterial.class);
        criteriaQuery.where(criteriaBuilder.equal(root.get("id"),202L));
        try {
            return entityManager.createQuery(criteriaQuery).getResultList().get(0);
        }catch (NoResultException e){
            return null;
        }
    }
}
