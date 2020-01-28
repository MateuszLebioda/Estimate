package com.estimate.api.controllers;

import com.estimate.model.entities.User;
import com.estimate.model.entities.dto.EstimateDTO;
import com.estimate.services.EstimateService;

import javax.ejb.EJB;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.Response;
import java.util.Optional;

@Path("/estimate")
public class EstimateControllers {

    @Inject
    private Optional<User> user;

    @EJB
    private EstimateService estimateService;

    @POST
    @Path("/add")
    public Response addMaterial(EstimateDTO estimateDTO){
        if(user.isPresent()){
            return Response.ok(estimateService.saveEstimate(estimateDTO)).build();
        }else {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }
    }

    @GET
    @Path("/getAll")
    public  Response getAllEstimates(){
        if(user.isPresent()){
            return Response.ok(estimateService.getAllEstimates()).build();
        }else {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }
    }

    @GET
    @Path("/getByClientId/{id}")
    public  Response getAllEstimatesByClient(@PathParam(value = "id")Long id){
        if(user.isPresent()){
            return Response.ok(estimateService.getAllEstimateByClientId(id)).build();
        }else {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }
    }

    @DELETE
    @Path("/delete/{id}")
    public Response delete(@PathParam(value = "id")Long id){
        if(user.isPresent()){
            return Response.ok(estimateService.deleteEstimate(id)).build();
        }else {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }
    }

    @PUT
    @Path("/edit")
    public Response delete(EstimateDTO estimateDTO){
        if(user.isPresent()){
            return Response.ok(estimateService.update(estimateDTO)).build();
        }else {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }
    }
}
