package com.estimate.api.producers;

import org.keycloak.TokenVerifier;
import org.keycloak.common.VerificationException;
import org.keycloak.representations.AccessToken;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.enterprise.context.RequestScoped;
import javax.enterprise.inject.Produces;
import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;

@RequestScoped
public class AccessTokenProducer {

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Inject
    private HttpServletRequest request;


    @Produces
    public AccessToken getAccessToken() {
        try {
            String token = request.getHeader("Authorization").substring(7);
            return TokenVerifier.create(token, AccessToken.class).getToken();
        } catch (VerificationException | NullPointerException e) {
            return null;
        }

    }
}
