package com.estimate.api.producers;

import com.estimate.model.entities.User;
import com.estimate.services.UserService;
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
    UserService userService;

    @Produces
    public Optional<User> getUser() {
        if (accessToken!=null) {
            String token = accessToken.getSubject();
            Optional<User> optionalUser = userService.getOptionalUserByToken(token);
            if (optionalUser.isPresent()) {
                return optionalUser;
            } else {
                return Optional.of(userService.createUser(token));
            }
        }
        return Optional.empty();
    }

}
