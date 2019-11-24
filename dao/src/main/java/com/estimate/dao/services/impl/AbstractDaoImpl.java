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

@Stateless(name = "abstractMaterialDao")
public class AbstractDaoImpl extends AbstractDao<AbstractMaterial> implements AbstractMaterialDao {
    @Override
    public List<Works> getAllWorks(User user) {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<Works> criteriaQuery = criteriaBuilder.createQuery(Works.class);
        Root<Works> root = criteriaQuery.from(Works.class);
        criteriaQuery.where(
                criteriaBuilder.and(
                        criteriaBuilder.equal(root.get("user"), user),
                        criteriaBuilder.equal(root.get("isActive"), true)
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

}
