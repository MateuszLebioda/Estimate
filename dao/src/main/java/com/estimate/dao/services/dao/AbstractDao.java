package com.estimate.dao.services.dao;


import com.estimate.model.entities.SimpleDao;

import javax.inject.Inject;
import javax.persistence.EntityManager;

public abstract class AbstractDao <T extends SimpleDao> implements AbstractDaoFunction<T>{

    @Inject
    protected EntityManager entityManager;

    public T save(T object){
        entityManager.persist(object);
        entityManager.flush();
        return object;
    }

    public void delete(T object){
        entityManager.remove(entityManager.find(object.getClass(),object.getId()));
    }

    public void merge(T object){
        entityManager.merge(object);
    }

}
