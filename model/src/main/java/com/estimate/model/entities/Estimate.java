package com.estimate.model.entities;

import com.estimate.model.entities.dto.EstimateDTO;
import com.estimate.model.entities.utils.SimpleEntity;
import lombok.Data;

import javax.persistence.*;

import java.util.List;
import java.util.stream.Collectors;

import static javax.persistence.GenerationType.SEQUENCE;

@Table(name = "estimate")
@Entity
@Data
public class Estimate  implements SimpleEntity<Estimate> {

    @Id
    @GeneratedValue(strategy = SEQUENCE,generator = "estimate_seq")
    private Long id;

    @Column
    private String name;

    @ManyToOne
    @JoinColumn(name="user_id", nullable=false)
    private User user;

    @OneToMany(mappedBy = "estimate", cascade = CascadeType.ALL)
    private List<AbstractMaterialEstimate> materials;

    @OneToMany(mappedBy = "estimate", cascade = CascadeType.ALL)
    private List<JobTemplateEstimate> jobTemplates;

    @Column(name = "sum_price")
    private Double sumPrice;

    @ManyToOne
    @JoinColumn(name = "client_id")
    private Client client;

    public void addAbstractMaterials(List<AbstractMaterialEstimate> materials){
        this.materials.addAll(materials);
    }

    public EstimateDTO toDTO(){
        return EstimateDTO.builder()
                .id(id)
                .jobTemplates(jobTemplates.stream().map(JobTemplateEstimate::toDTO).collect(Collectors.toList()))
                .materials(materials.stream().filter(material -> material instanceof MaterialEstimate).map(m -> ((MaterialEstimate)m).toDTO()).collect(Collectors.toList()))
                .services(materials.stream().filter(material -> material instanceof ServiceEstimate).map(w -> ((ServiceEstimate)w).toDTO()).collect(Collectors.toList()))
                .name(this.name)
                .client(this.client==null?null:this.client.toDTO())
                .sumPrice(this.sumPrice)
                .build();
    }


}
