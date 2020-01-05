package com.estimate.api.controllers;

import com.estimate.model.entities.Unit;
import com.estimate.model.entities.User;
import com.estimate.model.entities.dto.UnitDTO;
import com.estimate.model.entities.utils.Role;
import com.estimate.services.UnitService;

import javax.ejb.EJB;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.Response;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Path("/unit")
public class UnitController {

    @Inject
    private Optional<User> user;

    @EJB
    private UnitService unitService;

    @GET
    @Path("/getAllUnits")
    public Response getWorkUnits(){
        if(user.isPresent()){
            return Response.ok(getUnitList()).build();
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
            return Response.ok(unitService.addUnit(unit)).build();
        }else {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }
    }

    private List<UnitDTO> getUnitList(){
        return unitService.getAllUnits(user.get())
                .stream()
                .map(Unit::toDTO).collect(Collectors.toList());
    }

}
