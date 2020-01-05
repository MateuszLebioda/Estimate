package com.estimate.api.controllers;

import com.estimate.model.entities.User;
import com.estimate.model.entities.dto.WorkTemplateDTO;

import javax.inject.Inject;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;
import java.util.Optional;

@Path("/jobTemplate")
public class JobTemplateController {
    @Inject
    private Optional<User> user;

    @POST
    @Path("/add")
    public Response addMaterial(WorkTemplateDTO workTemplateDTO){
        if(user.isPresent()){
            System.out.println(workTemplateDTO);
            return Response.accepted().build();
        }else {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }
    }
}
