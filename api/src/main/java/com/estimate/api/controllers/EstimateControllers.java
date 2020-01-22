package com.estimate.api.controllers;

import com.estimate.model.entities.dto.EstimateDTO;
import com.estimate.services.EstimateService;

import javax.ejb.EJB;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;

@Path("/estimate")
public class EstimateControllers {

    @EJB
    private EstimateService estimateService;

    @POST
    @Path("/add")
    public Response addMaterial(EstimateDTO estimateDTO){
        return Response.ok(estimateService.saveEstimate(estimateDTO)).build();
    }

    @GET
    @Path("/getAll")
    public  Response getAllEstimates(){
        return Response.ok(estimateService.getAllEstimates()).build();
    }
}
