package com.estimate.api.controllers;

import com.estimate.model.entities.User;
import com.estimate.model.entities.dto.JobTemplateDTO;
import com.estimate.services.JobTemplateService;

import javax.ejb.EJB;
import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;
import java.util.Optional;

@Path("/jobTemplate")
public class JobTemplateController {
    @Inject
    private Optional<User> user;

    @EJB
    JobTemplateService jobTemplateService;

    @POST
    @Path("/add")
    public Response addJobTemplate(JobTemplateDTO jobTemplateDTO){
        if(user.isPresent()){
            jobTemplateService.addJobTemplateDTO(jobTemplateDTO);
            return Response.accepted().build();
        }else {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }
    }

    @GET
    @Path("/get")
    public Response getJobTemplates(){
        if(user.isPresent()){
            return Response.ok(jobTemplateService.getAllJobTemples(user.get())).build();
        }else {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }
    }
}
