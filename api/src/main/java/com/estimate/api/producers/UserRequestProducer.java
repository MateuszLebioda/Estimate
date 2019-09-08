package com.estimate.api.producers;

import com.estimate.dao.services.UserDao;
import com.estimate.model.entities.User;
import org.dom4j.util.UserDataAttribute;
import org.keycloak.representations.AccessToken;

import javax.ejb.EJB;
import javax.enterprise.context.RequestScoped;
import javax.enterprise.inject.Produces;
import javax.inject.Inject;
import java.util.Optional;

@RequestScoped
public class UserRequestProducer {

    @Inject
    AccessToken accessToken;

    @EJB
    private UserDao userDao;

    @Produces
    public Optional<User> getUser() {
        if (accessToken!=null) {
            String token = accessToken.getSubject();
            Optional<User> optionalUser = userDao.getUserByKeyCloakId(token);
            if (optionalUser.isPresent()) {
                return optionalUser;
            } else {
                User user = new User();
                user.setKeyCloakId(token);
                userDao.save(user);
                return Optional.of(user);
            }
        }
        return Optional.empty();
    }

}
