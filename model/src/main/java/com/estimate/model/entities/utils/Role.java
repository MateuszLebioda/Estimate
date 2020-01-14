package com.estimate.model.entities.utils;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum Role {
    @JsonProperty("WORK")
    WORK,
    @JsonProperty("MATERIAL")
    MATERIAL;

    public static final String WORKS_TITLE = "WORK";
    public static final String MATERIAL_TITLE = "MATERIAL";
}
