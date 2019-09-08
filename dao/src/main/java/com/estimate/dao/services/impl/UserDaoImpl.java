package com.estimate.dao.services.impl;

import com.estimate.dao.services.AbstractDao;
import com.estimate.dao.services.UserDao;
import com.estimate.model.entities.User;

import javax.ejb.Stateless;
import javax.persistence.NoResultException;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import java.util.Optional;

@Stateless(name = "userDao")
public class UserDaoImpl extends AbstractDao<User> implements UserDao  {

    @Override
    public Optional<User> getUserByKeyCloakId(String keyCloakId) {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<User> criteriaQuery = criteriaBuilder.createQuery(User.class);
        Root<User> root = criteriaQuery.from(User.class);
        criteriaQuery.where(criteriaBuilder.equal(root.get("keyCloakId"),keyCloakId));
        try {
            return Optional.of(entityManager.createQuery(criteriaQuery).getSingleResult());
        }catch (NoResultException e){
            return Optional.empty();
        }
    }
}
