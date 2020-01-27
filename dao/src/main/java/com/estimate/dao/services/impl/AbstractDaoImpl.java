package com.estimate.dao.services.impl;

import com.estimate.dao.services.dao.AbstractDao;
import com.estimate.dao.services.dao.AbstractMaterialDao;
import com.estimate.model.entities.*;

import javax.ejb.Stateless;
import javax.persistence.NoResultException;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Stateless(name = "abstractMaterialDao")
public class AbstractDaoImpl extends AbstractDao<AbstractMaterialTemplate> implements AbstractMaterialDao {
    @Override
    public List<WorkTemplate> getAllWorks(User user) {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<WorkTemplate> criteriaQuery = criteriaBuilder.createQuery(WorkTemplate.class);
        Root<WorkTemplate> root = criteriaQuery.from(WorkTemplate.class);
        criteriaQuery.where(
                criteriaBuilder.and(
                        criteriaBuilder.equal(root.get("user"), user)
                ));
        try {
            return new ArrayList<>(entityManager.createQuery(criteriaQuery).getResultList());
        } catch (NoResultException e) {
            return Collections.emptyList();
        }
    }

    @Override
    public List<MaterialTemplate> getAllMaterials(User user) {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<MaterialTemplate> criteriaQuery = criteriaBuilder.createQuery(MaterialTemplate.class);
        Root<MaterialTemplate> root = criteriaQuery.from(MaterialTemplate.class);
        criteriaQuery.where(
                criteriaBuilder.and(
                        criteriaBuilder.equal(root.get("user"), user)
                        ));
        try {
            return new ArrayList<>(entityManager.createQuery(criteriaQuery).getResultList());
        } catch (NoResultException e) {
            return Collections.emptyList();
        }
    }

    @Override
    public Optional<MaterialTemplate> getMaterialById(Long id) {
        return Optional.of((MaterialTemplate) getAbstractMaterialById(id).get());
    }

    @Override
    public Optional<WorkTemplate> getWorkById(Long id) {
        return Optional.of((WorkTemplate) getAbstractMaterialById(id).get());
    }

    @Override
    public Optional<AbstractMaterialTemplate> getAbstractMaterialById(Long id) {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<AbstractMaterialTemplate> criteriaQuery = criteriaBuilder.createQuery(AbstractMaterialTemplate.class);
        Root<AbstractMaterialTemplate> root = criteriaQuery.from(AbstractMaterialTemplate.class);
        criteriaQuery.where(criteriaBuilder.equal(root.get("id"),id));
        try {
            return Optional.of(entityManager.createQuery(criteriaQuery).getSingleResult());
        }catch (NoResultException e){
            return Optional.empty();
        }
    }

}
