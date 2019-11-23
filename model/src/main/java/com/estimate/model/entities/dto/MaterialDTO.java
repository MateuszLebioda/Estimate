package com.estimate.model.entities.dto;

import com.estimate.model.entities.User;
import lombok.Data;

@Data
public class MaterialDTO {
    private Long id;
    private String name;
    private Double price;
    private Long unitId;
    private User user;

    public MaterialDTO() {
    }

    public MaterialDTO(Long id, String name, Double price, Long unitId, User user) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.unitId = unitId;
        this.user = getUser();
    }
}
