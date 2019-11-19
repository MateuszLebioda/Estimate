package com.estimate.api.controllers;

import com.estimate.model.entities.User;
import com.estimate.services.MaterialService;


import javax.ejb.EJB;
import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;
import java.util.Optional;

@Path("/client")
public class MaterialsController {

    @Inject
    private Optional<User> user;

    @EJB
    private MaterialService materialService;

    @GET
    @Path("/getAllMaterials")
    public Response getMaterials(){
        if(user.isPresent()){
            return Response.ok(materialService.getAllMaterials(user.get())).build();
        }else {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }
    }

    @GET
    @Path("/getAllWorks")
    public Response getWorks(){
        if(user.isPresent()){
            return Response.ok(materialService.getAllMaterials(user.get())).build();
        }else {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }
    }
}
