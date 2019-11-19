package com.estimate.services;

import com.estimate.model.entities.User;

import javax.ejb.Local;
import java.util.Optional;

@Local
public interface UserService {
    Optional<User> getOptionalUserByToken(String token);
    User createUser(String token);
}
