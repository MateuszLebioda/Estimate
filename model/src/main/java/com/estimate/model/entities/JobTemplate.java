package com.estimate.model.entities;

import com.estimate.model.entities.dto.JobTemplateDTO;
import com.estimate.model.entities.utils.SimpleEntity;
import lombok.Data;

import javax.persistence.*;

import java.util.Set;

import static javax.persistence.GenerationType.SEQUENCE;

@Data
@Entity
@Table(name = "workTemplate")
public class JobTemplate implements SimpleEntity<JobTemplate> {

    @Id
    @GeneratedValue(strategy=SEQUENCE, generator="workTemplate_seq")
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "workTemple", cascade = CascadeType.ALL)
    Set<JobTemplateAbstractMaterial> jobTemplateAbstractMaterial;

    @ManyToOne
    @JoinColumn(name="unit_id", nullable=false)
    private Unit unit;


    @ManyToOne
    @JoinColumn(name="user_id", nullable=false)
    private User user;


    public void mergeWithDto(JobTemplateDTO clientDTO){

    }
}
