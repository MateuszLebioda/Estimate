package com.estimate.dao.services;

import javax.inject.Inject;
import javax.persistence.EntityManager;

public abstract class AbstractDao <T extends Object> implements AbstractDaoFunction<T>{

    @Inject
    protected EntityManager entityManager;

    public void save(T object){
        entityManager.persist(object);
    }

    public void delete(T object){
        entityManager.remove(object);
    }

    public void merge(T object){
        entityManager.merge(object);
    }

}
