package com.estimate.model.entities;

import com.estimate.model.entities.utils.Role;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity()
@DiscriminatorValue(value = Role.WORKS_TITLE)
public class Works extends AbstractMaterial {

}

