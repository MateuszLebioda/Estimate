package com.estimate.dao.services.impl;

import com.estimate.dao.services.dao.AbstractDao;
import com.estimate.dao.services.dao.ClientDao;
import com.estimate.model.entities.Client;
import com.estimate.model.entities.User;

import javax.ejb.Stateless;
import javax.persistence.NoResultException;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

@Stateless(name = "clientDao")
public class ClientDaoImpl extends AbstractDao<Client> implements ClientDao {
    @Override
    public Set<Client> getClientsByUser(User user) {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<Client> criteriaQuery = criteriaBuilder.createQuery(Client.class);
        Root<Client> root = criteriaQuery.from(Client.class);
        criteriaQuery.where(criteriaBuilder.equal(root.get("user"),user));
        try {
            return new HashSet<>(entityManager.createQuery(criteriaQuery).getResultList());
        }catch (NoResultException e){
            return Collections.emptySet();
        }
    }
}
