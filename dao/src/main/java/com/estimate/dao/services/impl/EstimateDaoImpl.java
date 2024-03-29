package com.estimate.dao.services.impl;

import com.estimate.dao.services.dao.EstimateDao;
import com.estimate.dao.services.dao.AbstractDao;
import com.estimate.model.entities.Client;
import com.estimate.model.entities.Estimate;
import com.estimate.model.entities.User;
import com.estimate.model.entities.dto.EstimateDTO;

import javax.ejb.Stateless;
import javax.persistence.NoResultException;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Stateless(name = "estimateDao")
public class EstimateDaoImpl extends AbstractDao<Estimate> implements EstimateDao {

    @Override
    public List<Estimate> getEstimatesByUser(User user) {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<Estimate> criteriaQuery = criteriaBuilder.createQuery(Estimate.class);
        Root<Estimate> root = criteriaQuery.from(Estimate.class);
        criteriaQuery.where(criteriaBuilder.equal(root.get("user"), user));
        try {
            return new ArrayList<>(entityManager.createQuery(criteriaQuery).getResultList());
        } catch (NoResultException e) {
            return Collections.emptyList();
        }
    }

    @Override
    public Estimate getEstimatesById(Long id) {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<Estimate> criteriaQuery = criteriaBuilder.createQuery(Estimate.class);
        Root<Estimate> root = criteriaQuery.from(Estimate.class);
        criteriaQuery.where(criteriaBuilder.equal(root.get("id"), id));
        try {
            return entityManager.createQuery(criteriaQuery).getSingleResult();
        } catch (NoResultException e) {
            return null;
        }
    }

    @Override
    public List<Estimate> getEstimateByClientId(Client client, User user) {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<Estimate> criteriaQuery = criteriaBuilder.createQuery(Estimate.class);
        Root<Estimate> root = criteriaQuery.from(Estimate.class);
        criteriaQuery.where(
                criteriaBuilder.and(
                        criteriaBuilder.equal(root.get("user"), user),
                        criteriaBuilder.equal(root.get("client"), client)));

        try {
            return new ArrayList<>(entityManager.createQuery(criteriaQuery).getResultList());
        } catch (NoResultException e) {
            return Collections.emptyList();
        }
    }
}
