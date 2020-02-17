package com.estimate.api.controllers;

import com.estimate.model.entities.Unit;
import com.estimate.model.entities.User;
import com.estimate.services.UnitService;

import javax.ejb.EJB;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.Response;
import java.time.LocalDateTime;
import java.util.Optional;

@Path("/unit")
public class UnitController {

    @Inject
    private Optional<User> user;

    @EJB
    private UnitService unitService;

    @GET
    @Path("/getAllUnits")
    public Response get(){
        if(user.isPresent()){
            return Response.ok(unitService.getAllUnits(user.get())).build();
        }else {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }
    }

    @GET
    @Path("/getHiddenUnits")
    public Response getHiddenUtils(){
        if(user.isPresent()){
            return Response.ok(unitService.getHiddenUnits(user.get())).build();
        }else {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }
    }

    @GET
    @Path("/getDisplayedUnits")
    public Response getDisplayedUnits(){
        if(user.isPresent()){
            return Response.ok(unitService.getDisplayedUnits(user.get())).build();
        }else {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }
    }

    @PUT
    @Path("/hide/{id}")
    public Response hideUnit(@PathParam("id") Long id){
        if(user.isPresent()){
            unitService.hideUnit(id);
            return Response.ok().build();
        }else {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }
    }

    @PUT
    @Path("/display/{id}")
    public Response displayUnit(@PathParam("id") Long id){
        if(user.isPresent()){
            unitService.displayUnit(id);
            return Response.ok().build();
        }else {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }
    }

    @DELETE
    @Path("/delete/{id}")
    public Response deleteUnit(@PathParam("id") long id){
        if(user.isPresent()){
            Unit unit = unitService.getUnitById(id);
            if(unitService.isMyUnit(user.get(),unit)){
                return Response.ok(unitService.deleteUnit(unit)).build();
            }
        }
            return Response.status(Response.Status.UNAUTHORIZED).build();
    }

    @POST
    @Path("/add")
    public Response addUnit(Unit unit){
        if(user.isPresent()){
            unit.setUser(user.get());
            unit.setCreated(LocalDateTime.now());
            unit.setHidden(Boolean.FALSE);
            return Response.ok(unitService.addUnit(unit)).build();
        }else {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }
    }


}
