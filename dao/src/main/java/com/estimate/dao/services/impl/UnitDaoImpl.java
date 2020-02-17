package com.estimate.dao.services.impl;

import com.estimate.dao.services.dao.AbstractDao;
import com.estimate.dao.services.dao.UnitDao;
import com.estimate.model.entities.Unit;
import com.estimate.model.entities.User;
import com.estimate.model.entities.utils.Role;

import javax.ejb.Stateless;
import javax.persistence.NoResultException;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Stateless(name = "unitDao")
public class UnitDaoImpl extends AbstractDao<Unit> implements UnitDao {

    @Override
    public List<Unit> getAllUnitsByUser(User user) {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<Unit> criteriaQuery = criteriaBuilder.createQuery(Unit.class);
        Root<Unit> root = criteriaQuery.from(Unit.class);
        criteriaQuery.where(criteriaBuilder.equal(root.get("user"),user));
        try {
            return new ArrayList<>(entityManager.createQuery(criteriaQuery).getResultList());
        }catch (NoResultException e){
            return Collections.emptyList();
        }
    }

    @Override
    public List<Unit> getHiddenUnitsByUser(User user) {
        return getUnitsByHiddenAttribute(true, user);
    }

    @Override
    public List<Unit> getDisplayUnitsByUser(User user) {
        return getUnitsByHiddenAttribute(false, user);
    }

    @Override
    public Optional<Unit> getUnitById(Long id) {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<Unit> criteriaQuery = criteriaBuilder.createQuery(Unit.class);
        Root<Unit> root = criteriaQuery.from(Unit.class);
        criteriaQuery.where(criteriaBuilder.equal(root.get("id"),id));
        try {
            return Optional.of(entityManager.createQuery(criteriaQuery).getSingleResult());
        }catch (NoResultException e){
            return Optional.empty();
        }
    }

    private List<Unit> getUnitsByHiddenAttribute(boolean hidden, User user){
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<Unit> criteriaQuery = criteriaBuilder.createQuery(Unit.class);
        Root<Unit> root = criteriaQuery.from(Unit.class);
        criteriaQuery.where(
                criteriaBuilder.and(
                    criteriaBuilder.equal(root.get("hidden"),hidden)),
                    criteriaBuilder.equal(root.get("user"),user)
                );
        try {
            return new ArrayList<>(entityManager.createQuery(criteriaQuery).getResultList());
        }catch (NoResultException e){
            return Collections.emptyList();
        }
    }
}
