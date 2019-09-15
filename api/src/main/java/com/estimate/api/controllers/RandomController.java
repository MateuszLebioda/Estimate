package com.estimate.api.controllers;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;
import java.util.Random;

@Path("/random")
public class RandomController {

    @GET
    public Response getRandomNumber(){
        return Response.ok(new Random().nextInt(100)).build();
    }
}
