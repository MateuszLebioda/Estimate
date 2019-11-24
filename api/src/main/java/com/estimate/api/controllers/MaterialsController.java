package com.estimate.api.controllers;

import com.estimate.model.entities.Client;
import com.estimate.model.entities.Material;
import com.estimate.model.entities.User;
import com.estimate.model.entities.dto.ClientDTO;
import com.estimate.model.entities.dto.MaterialDTO;
import com.estimate.services.MaterialService;


import javax.ejb.EJB;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.Response;
import java.util.Optional;
import java.util.stream.Collectors;

@Path("/materials")
public class MaterialsController {

    @Inject
    private Optional<User> user;

    @EJB
    private MaterialService materialService;

    @POST
    @Path("/addMaterial")
    public Response addMaterial(MaterialDTO material){
        if(user.isPresent()){
            material.setUser(user.get());
            return Response.ok(materialService.addMaterialFromDTO(material)).build();
        }else {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }
    }


    @GET
    @Path("/getAllMaterials")
    public Response getMaterials(){
        if(user.isPresent()){
            return Response.ok(materialService.getAllMaterials(user.get()).stream().map(Material::toDTO).collect(Collectors.toList())).build();
        }else {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }
    }

    @GET
    @Path("/getAllWorks")
    public Response getWorks(){
        if(user.isPresent()){
            return Response.ok(materialService.getAllMaterials(user.get())).build();
        }else {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }
    }

    @DELETE
    @Path("/delete/{id}")
    public Response deleteClient(@PathParam("id") long id){
        if(user.isPresent()){
            Optional<Material> optionalMaterial = materialService.getMaterialById(id);
            if(optionalMaterial.isPresent()) {
                if (materialService.isMyMaterial(user.get(),optionalMaterial.get())) {
                    materialService.deleteMaterial(optionalMaterial.get());
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
    public Response updateClient(MaterialDTO materialDTO) {
        if(user.isPresent()){
            Material material = materialService.getMaterialById(materialDTO.getId()).get();
            if (materialService.isMyMaterial(user.get(), material)) {
                materialDTO.setUser(user.get());
                materialService.updateMaterial(material,materialDTO);
                return Response.ok().build();
            }else {
                return Response.accepted("Client doest not exist").build();
            }
        }else {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }
    }
}
