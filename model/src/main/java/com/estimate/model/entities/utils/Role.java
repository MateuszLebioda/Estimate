package com.estimate.model.entities.utils;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum Role {
    @JsonProperty("SERVICE")
    SERVICE,
    @JsonProperty("MATERIAL")
    MATERIAL;

    public static final String SERVICE_TITLE = "SERVICE";
    public static final String MATERIAL_TITLE = "MATERIAL";
}
