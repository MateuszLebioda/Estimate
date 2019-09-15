package com.estimate.dao.services.dao;

public interface AbstractDaoFunction<T> {

    public T save(T object);

    public void delete(T object);

    public void merge(T object);

}
