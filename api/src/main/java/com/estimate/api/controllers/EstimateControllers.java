package com.estimate.api.controllers;

import com.estimate.model.entities.dto.EstimateDTO;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;

@Path("/estimate")
public class EstimateControllers {

    @POST
    @Path("/add")
    public Response addMaterial(EstimateDTO estimateDTO){
        return Response.ok(estimateDTO).build();
    }
}
