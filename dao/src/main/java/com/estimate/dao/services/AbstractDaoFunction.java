package com.estimate.dao.services;

public interface AbstractDaoFunction<T> {

    public void save(T object);

    public void delete(T object);

    public void merge(T object);

}
