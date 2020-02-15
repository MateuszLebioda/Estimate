package com.estimate.api.controllers;

import com.estimate.model.entities.User;
import com.estimate.services.JasperService;

import javax.ejb.EJB;
import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Response;
import java.util.Optional;

@Path("/reports")
public class ReportsController {

    @Inject
    private Optional<User> user;

    @EJB
    private JasperService jasperService;

    @GET
    @Path("/getMaterialPriceList")
    public Response getMaterialsPriceListReport(){
        if(user.isPresent()){
            return Response.ok(jasperService.generateMaterialPriceList(user.get().getId())).build();
        }else {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }
    }

    @GET
    @Path("/getServicesPriceList")
    public Response getServicesPriceListReport(){
        if(user.isPresent()){
            return Response.ok(jasperService.generateServicesPriceList(user.get().getId())).build();
        }else {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }
    }

    @GET
    @Path("/getEstimateReport/{id}")
    public Response getEstimateReport(@PathParam(value = "id") Long estimateId){
        if(user.isPresent()){
            return Response.ok(jasperService.generateEstimateReport(user.get().getId(), estimateId)).build();
        }else {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }
    }
}
