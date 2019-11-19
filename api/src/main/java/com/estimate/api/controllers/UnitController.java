package com.estimate.api.controllers;

import com.estimate.model.entities.Unit;
import com.estimate.model.entities.User;
import com.estimate.model.entities.dto.UnitDTO;
import com.estimate.model.entities.utils.Role;
import com.estimate.services.UnitService;

import javax.ejb.EJB;
import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;
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
    @Path("/getAllMaterialsUnits")
    public Response getMaterialsUnits(){
        if(user.isPresent()){
            return Response.ok(getUnitList(Role.MATERIAL)).build();
        }else {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }
    }

    @GET
    @Path("/getAllWorkUnits")
    public Response getWorkUnits(){
        if(user.isPresent()){
            return Response.ok(getUnitList(Role.WORKS)).build();
        }else {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }
    }

    private List<UnitDTO> getUnitList(Role role){
        return unitService.getAllUnitsByRole(user.get(), role)
                .stream()
                .map(Unit::toDTO).collect(Collectors.toList());
    }

}
