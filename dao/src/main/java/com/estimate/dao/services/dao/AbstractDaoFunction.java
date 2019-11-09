package com.estimate.dao.services.dao;

public interface AbstractDaoFunction<T> {

    T save(T object);

    void delete(T object);

    void merge(T object);

}
