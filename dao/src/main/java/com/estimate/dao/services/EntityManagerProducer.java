package com.estimate.dao.services;

import javax.enterprise.context.RequestScoped;
import javax.enterprise.inject.Produces;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@RequestScoped
public class EntityManagerProducer {

    @PersistenceContext(unitName = "estimate")
    private EntityManager em;

    @Produces
    public EntityManager getEntityManager() {
        return em;
    }
}
