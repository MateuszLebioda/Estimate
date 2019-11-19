package com.estimate.services;

import com.estimate.dao.services.dao.UserDao;
import com.estimate.model.entities.User;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import java.util.Optional;

@Stateless(name = "userService")
public class UserServiceImpl implements UserService {

    @EJB
    private UserDao userDao;

    @EJB
    UnitService unitService;

    @Override
    public Optional<User> getOptionalUserByToken(String token) {
        return userDao.getUserByKeyCloakId(token);
    }

    @Override
    public User createUser(String token) {
        User user = new User();
        user.setKeyCloakId(token);
        user.setUnit(unitService.generateDefaultUnitsToUser(user));
        userDao.save(user);
        return user;
    }
}
