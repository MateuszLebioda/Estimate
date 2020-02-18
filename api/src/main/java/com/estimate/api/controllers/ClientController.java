package com.estimate.api.controllers;

import com.estimate.model.entities.Client;
import com.estimate.model.entities.User;
import com.estimate.model.entities.dto.ClientDTO;
import com.estimate.services.ClientService;
import javax.ejb.EJB;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.Response;
import java.util.Optional;

@Path("/client")
public class ClientController {

    @Inject
    private Optional<User> user;

    @EJB
    private ClientService clientService;

    @GET
    @Path("/getAll")
    public Response getClients(){
        if(user.isPresent()){
            return Response.ok(clientService.getAllDTOClients(user.get())).build();
        }else {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }
    }

    @POST
    @Path("/add")
    public Response addClient(Client client){
        if(user.isPresent()){
            client.setUser(user.get());
            Long newClientId = clientService.addClient(client);
            return Response.ok(newClientId).build();
        }else {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }
    }

    @DELETE
    @Path("/delete/{id}")
    public Response deleteClient(@PathParam("id") long id){
        if(user.isPresent()){
            Optional<Client> optionalClient = clientService.getOptionalClientById(id);
            if(optionalClient.isPresent()) {
                if (clientService.isMyClient(user.get(),optionalClient.get())) {
                    clientService.deleteClient(optionalClient.get());
                    return Response.ok().build();
                }else {
                    return Response.accepted("Client doest not exist").build();
                }
            }
            return Response.status(Response.Status.FORBIDDEN).build();
        }
        return Response.status(Response.Status.UNAUTHORIZED).build();
    }


    @PUT
    @Path("/update")
    public Response updateClient(ClientDTO clientDTO) {
        if(user.isPresent()){
            if(clientService.mergeClient(clientDTO,user.get())){
                return Response.ok(true).build();
            }else {
                return Response.ok(false).build();
            }
        }else {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }
    }


}
