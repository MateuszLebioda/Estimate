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
public class AbstractDaoImpl extends AbstractDao<AbstractMaterial> implements AbstractMaterialDao {
    @Override
    public List<Work> getAllWorks(User user) {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<Work> criteriaQuery = criteriaBuilder.createQuery(Work.class);
        Root<Work> root = criteriaQuery.from(Work.class);
        criteriaQuery.where(
                criteriaBuilder.and(
                        criteriaBuilder.equal(root.get("user"), user),
                        criteriaBuilder.equal(root.get("actual"), true)
                ));
        try {
            return new ArrayList<>(entityManager.createQuery(criteriaQuery).getResultList());
        } catch (NoResultException e) {
            return Collections.emptyList();
        }
    }

    @Override
    public List<Material> getAllMaterials(User user) {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<Material> criteriaQuery = criteriaBuilder.createQuery(Material.class);
        Root<Material> root = criteriaQuery.from(Material.class);
        criteriaQuery.where(
                criteriaBuilder.and(
                        criteriaBuilder.equal(root.get("user"), user),
                        criteriaBuilder.equal(root.get("actual"), true)
                        ));
        try {
            return new ArrayList<>(entityManager.createQuery(criteriaQuery).getResultList());
        } catch (NoResultException e) {
            return Collections.emptyList();
        }
    }

    @Override
    public Optional<Material> getMaterialById(Long id) {
        return Optional.of((Material) getAbstractMaterialById(id).get());
    }

    @Override
    public Optional<Work> getWorkById(Long id) {
        return Optional.of((Work) getAbstractMaterialById(id).get());
    }

    @Override
    public Optional<AbstractMaterial> getAbstractMaterialById(Long id) {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<AbstractMaterial> criteriaQuery = criteriaBuilder.createQuery(AbstractMaterial.class);
        Root<AbstractMaterial> root = criteriaQuery.from(AbstractMaterial.class);
        criteriaQuery.where(criteriaBuilder.equal(root.get("id"),id));
        try {
            return Optional.of(entityManager.createQuery(criteriaQuery).getSingleResult());
        }catch (NoResultException e){
            return Optional.empty();
        }
    }

}
