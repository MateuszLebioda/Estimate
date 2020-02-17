package com.estimate.api.controllers;

import com.estimate.model.entities.MaterialTemplate;
import com.estimate.model.entities.User;
import com.estimate.model.entities.ServiceTemplate;
import com.estimate.model.entities.dto.MaterialTemplateDTO;
import com.estimate.model.entities.dto.ServiceTempleDTO;
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
    @Path("/addService")
    public Response addService(ServiceTempleDTO serviceTemplateDTO){
        if(user.isPresent()){
            serviceTemplateDTO.setUser(user.get());
            return Response.ok(materialService.addAbstractMaterialFromDTO(serviceTemplateDTO)).build();
        }else {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }
    }


    @GET
    @Path("/getAllMaterials")
    public Response getMaterials(){
        if(user.isPresent()){
            return Response.ok(
                    materialService.getAllMaterialsDTO(user.get())).build();
        }else {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }
    }

    @GET
    @Path("/getAllServices")
    public Response getAllServices(){
        if(user.isPresent()){
            return Response.ok(
                    materialService.getAllServicesDTO(user.get())).build();
        }else {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }
    }

    @GET
    @Path("/getDisplayedMaterials")
    public Response getDisplayedMaterials(){
        if(user.isPresent()){
            return Response.ok(
                    materialService.getDisplayedMaterials(user.get())).build();
        }else {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }
    }

    @GET
    @Path("/getHideMaterials")
    public Response getHideMaterials(){
        if(user.isPresent()){
            return Response.ok(
                    materialService.getHideMaterials(user.get())).build();
        }else {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }
    }

    @GET
    @Path("/getDisplayedServices")
    public Response getDisplayedServices(){
        if(user.isPresent()){
            return Response.ok(
                    materialService.getDisplayedServices(user.get())).build();
        }else {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }
    }

    @GET
    @Path("/getHideServices")
    public Response getHideServices(){
        if(user.isPresent()){
            return Response.ok(
                    materialService.getHideServices(user.get())).build();
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
                    return Response.ok(materialService.deleteAbstractMaterial(id)).build();
                }else {
                    return Response.accepted("Client doest not exist").build();
                }
            }
            return Response.status(Response.Status.FORBIDDEN).build();
        }
        return Response.status(Response.Status.UNAUTHORIZED).build();
    }

    @DELETE
    @Path("/deleteService/{id}")
    public Response deleteService(@PathParam("id") long id){
        if(user.isPresent()){
            Optional<ServiceTemplate> optionalService = materialService.getServiceById(id);
            if(optionalService.isPresent()) {
                if (materialService.isMyMaterial(user.get(),optionalService.get())) {
                    return Response.ok(materialService.deleteAbstractMaterial(id)).build();
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
    @Path("/updateServiceTemplate")
    public Response updateService(ServiceTempleDTO serviceTempleDTO) {
        if(user.isPresent()){
            ServiceTemplate serviceTemplate = materialService.getServiceById(serviceTempleDTO.getId()).get();
            if (materialService.isMyMaterial(user.get(), serviceTemplate)) {
                serviceTempleDTO.setUser(user.get());
                materialService.updateAbstractMaterial(serviceTempleDTO);
                return Response.ok().build();
            }else {
                return Response.accepted("Client doest not exist").build();
            }
        }else {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }
    }

    @PUT
    @Path("/hide/{id}")
    public Response hideUnit(@PathParam("id") Long id){
        if(user.isPresent()){
            materialService.hideAbstractMaterial(id);
            return Response.ok().build();
        }else {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }
    }

    @PUT
    @Path("/display/{id}")
    public Response displayUnit(@PathParam("id") Long id){
        if(user.isPresent()){
            materialService.displayAbstractMaterial(id);
            return Response.ok().build();
        }else {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }
    }
}
