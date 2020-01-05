package com.estimate.model.entities.dto;

import com.estimate.model.entities.utils.Role;
import lombok.Data;

@Data
public class UnitDTO {
    private Long id;
    private String bottom;
    private String top;
    private Role role;
    private Boolean actual;
    private Long user;

    public UnitDTO() {
    }

    public UnitDTO(Long id, String bottom, String top, Boolean actual, Long user) {
        this.id = id;
        this.bottom = bottom;
        this.top = top;
        this.actual = actual;
        this.user = user;
    }
}
