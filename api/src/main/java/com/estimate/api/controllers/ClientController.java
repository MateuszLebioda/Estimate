package com.estimate.api.controllers;

import com.estimate.dao.services.dao.ClientDao;
import com.estimate.model.entities.Client;
import com.estimate.model.entities.User;

import javax.ejb.EJB;
import javax.ejb.PostActivate;
import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;
import java.util.Optional;

@Path("/client")
public class ClientController {

    @Inject
    private Optional<User> user;

    @EJB
    private ClientDao clientDao;

    @GET
    @Path("/getAll")
    public Response getClients(){
        if(user.isPresent()){
            return Response.ok(clientDao.getClientsByUser(user.get())).build();
        }else {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }
    }

    @POST
    @Path("/add")
    public Response addClient(Client client){
        if(user.isPresent()){
            client.setUser(user.get());
            clientDao.save(client);
            return Response.ok().build();
        }else {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }
    }
}
