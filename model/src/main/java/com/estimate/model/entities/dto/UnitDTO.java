package com.estimate.model.entities.dto;

import lombok.Data;

@Data
public class UnitDTO {
    private Long id;
    private String bottom;
    private String top;

    public UnitDTO() {
    }

    public UnitDTO(Long id, String bottom, String top) {
        this.id = id;
        this.bottom = bottom;
        this.top = top;
    }
}
