package com.estimate.api.keycloak;

import org.keycloak.TokenVerifier;
import org.keycloak.common.VerificationException;
import org.keycloak.representations.AccessToken;

import javax.enterprise.context.RequestScoped;
import javax.enterprise.inject.Produces;
import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;

@RequestScoped
public class AccessTokenProducer {

    @Inject
    private HttpServletRequest request;

    @Produces
    public AccessToken getAccessToken() {
        String token = request.getHeader("Authorization").substring(7);
        try {
            return  TokenVerifier.create(token, AccessToken.class).getToken();
        } catch (VerificationException e) {
            return null;
        }
    }
}
