package com.estimate.dao.services.dao;

import com.estimate.model.entities.User;

import javax.ejb.Local;
import java.util.Optional;

@Local
public interface UserDao extends AbstractDaoFunction<User>{

    Optional<User> getUserByKeyCloakId(String keyCloakId);

}
