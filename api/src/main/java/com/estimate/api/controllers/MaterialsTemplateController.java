package com.estimate.api.controllers;

import com.estimate.model.entities.MaterialTemplate;
import com.estimate.model.entities.User;
import com.estimate.model.entities.WorkTemplate;
import com.estimate.model.entities.dto.MaterialTemplateDTO;
import com.estimate.model.entities.dto.WorkTemplateDTO;
import com.estimate.services.MaterialService;


import javax.ejb.EJB;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.Response;
import java.util.Comparator;
import java.util.Optional;
import java.util.stream.Collectors;

@Path("/materials")
public class MaterialsTemplateController {

    @Inject
    private Optional<User> user;

    @EJB
    private MaterialService materialService;

    @POST
    @Path("/addMaterial")
    public Response addMaterial(MaterialTemplateDTO material){
        if(user.isPresent()){
            material.setUser(user.get());
            return Response.ok(materialService.addAbstractMaterialFromDTO(material)).build();
        }else {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }
    }

    @POST
    @Path("/addWorks")
    public Response addMaterial(WorkTemplateDTO workDTO){
        if(user.isPresent()){
            workDTO.setUser(user.get());
            return Response.ok(materialService.addAbstractMaterialFromDTO(workDTO)).build();
        }else {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }
    }


    @GET
    @Path("/getAllMaterials")
    public Response getMaterials(){
        if(user.isPresent()){
            return Response.ok(
                    materialService.getAllMaterials(user.get())
                            .stream()
                            .map(MaterialTemplate::toDTO)
                            .sorted(Comparator.comparing(MaterialTemplateDTO::getName))
                            .collect(Collectors.toList())).build();
        }else {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }
    }

    @GET
    @Path("/getAllWorks")
    public Response getWorks(){
        if(user.isPresent()){
            return Response.ok(
                    materialService.getAllWorks(user.get())
                            .stream().map(WorkTemplate::toDTO)
                            .sorted(Comparator.comparing(WorkTemplateDTO::getName))
                            .collect(Collectors.toList())).build();
        }else {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }
    }

    @DELETE
    @Path("/deleteMaterial/{id}")
    public Response deleteMaterial(@PathParam("id") long id){
        if(user.isPresent()){
            Optional<MaterialTemplate> optionalMaterial = materialService.getMaterialById(id);
            if(optionalMaterial.isPresent()) {
                if (materialService.isMyMaterial(user.get(),optionalMaterial.get())) {
                    materialService.deleteAbstractMaterial(optionalMaterial.get());
                    return Response.ok().build();
                }else {
                    return Response.accepted("Client doest not exist").build();
                }
            }
            return Response.status(Response.Status.FORBIDDEN).build();
        }
        return Response.status(Response.Status.UNAUTHORIZED).build();
    }

    @DELETE
    @Path("/deleteWork/{id}")
    public Response deleteWork(@PathParam("id") long id){
        if(user.isPresent()){
            Optional<WorkTemplate> optionalWork = materialService.getWorkById(id);
            if(optionalWork.isPresent()) {
                if (materialService.isMyMaterial(user.get(),optionalWork.get())) {
                    materialService.deleteAbstractMaterial(optionalWork.get());
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
    @Path("/updateMaterialTemplate")
    public Response updateMaterial(MaterialTemplateDTO materialDTO) {
        if(user.isPresent()){
            MaterialTemplate material = materialService.getMaterialById(materialDTO.getId()).get();
            if (materialService.isMyMaterial(user.get(), material)) {
                materialDTO.setUser(user.get());
                materialService.updateAbstractMaterial(materialDTO);
                return Response.ok().build();
            }else {
                return Response.accepted("Client doest not exist").build();
            }
        }else {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }
    }

    @PUT
    @Path("/updateWorkTemplate")
    public Response updateWork(WorkTemplateDTO workDTO) {
        if(user.isPresent()){
            WorkTemplate workTemplate = materialService.getWorkById(workDTO.getId()).get();
            if (materialService.isMyMaterial(user.get(), workTemplate)) {
                workDTO.setUser(user.get());
                materialService.updateAbstractMaterial(workDTO);
                return Response.ok().build();
            }else {
                return Response.accepted("Client doest not exist").build();
            }
        }else {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }
    }
}
