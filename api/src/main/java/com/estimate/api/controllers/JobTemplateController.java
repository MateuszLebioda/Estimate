package com.estimate.api.controllers;

import com.estimate.model.entities.JobTemplate;
import com.estimate.model.entities.User;
import com.estimate.model.entities.dto.JobTemplateDTO;
import com.estimate.services.JobTemplateService;

import javax.ejb.EJB;
import javax.inject.Inject;
import javax.ws.rs.*;
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
            return Response.accepted(jobTemplateService.addJobTemplateDTO(jobTemplateDTO)).build();
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

    @DELETE
    @Path("/delete/{id}")
    public Response deleteJobTemplate(@PathParam("id") long id){
        if(user.isPresent()){
            Optional<JobTemplate> optionalMaterial = jobTemplateService.getJobTemplateById(id);
            if(optionalMaterial.isPresent()) {
                if (jobTemplateService.isMyJobTemplate(user.get(),optionalMaterial.get())) {
                    jobTemplateService.deleteJobTemplate(optionalMaterial.get());
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
    public Response editJobTemplate(JobTemplateDTO jobTemplateDTO){
        if(user.isPresent()){
            JobTemplate jobTemplate = jobTemplateService.getJobTemplateById(jobTemplateDTO.getId()).get();
            if(jobTemplateService.isMyJobTemplate(user.get(), jobTemplate)) {
                JobTemplateDTO updatedJobTemplate = jobTemplateService.updateJobTemplate(jobTemplateDTO);
                return Response.ok(updatedJobTemplate).build();
            }
            return Response.status(Response.Status.FORBIDDEN).build();
        }
        return Response.status(Response.Status.UNAUTHORIZED).build();
    }
}
