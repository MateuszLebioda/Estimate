package com.estimate.model.entities.utils;

import com.estimate.model.entities.User;
import com.estimate.model.entities.dto.WorkTemplateDTO;
import lombok.Data;

import javax.persistence.*;

import java.util.Set;

import static javax.persistence.GenerationType.SEQUENCE;

@Data
@Entity
@Table(name = "workTemplate")
public class WorkTemplate {

    @Id
    @GeneratedValue(strategy=SEQUENCE, generator="workTemplate_seq")
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "workTemple", cascade = CascadeType.ALL)
    Set<WorkTemplateAbstractMaterial> workTemplateAbstractMaterial;

    @ManyToOne
    @JoinColumn(name="user_id", nullable=false)
    private User user;


    public void mergeWithDto(WorkTemplateDTO clientDTO){

    }
}
