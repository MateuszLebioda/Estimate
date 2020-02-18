package com.estimate.model.entities;

import com.estimate.model.entities.dto.UnitDTO;
import com.estimate.model.entities.utils.SimpleEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static javax.persistence.GenerationType.SEQUENCE;

@Table(name = "unit")
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Unit implements SimpleEntity<Unit>, Comparable<Unit> {
    @Id
    @GeneratedValue(strategy = SEQUENCE, generator = "unit_id")
    @Column(name = "id")
    private Long id;

    @Column(name = "bottom")
    private String bottom;

    @Column(name = "top")
    private String top;

    @OneToMany(mappedBy = "unit")
    private List<AbstractMaterialTemplate> materials;

    @Column(name = "hidden")
    private Boolean hidden;

    @Column(name = "created")
    private LocalDateTime created;

    @ManyToOne(cascade = {CascadeType.ALL})
    @JoinColumn(name = "parent")
    private Unit parent;

    @OneToMany(mappedBy = "parent")
    private List<Unit> children;

    @OneToMany(mappedBy = "unit", cascade = CascadeType.ALL)
    private List<JobTemplate> jobTemplates;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;


    public Unit(String bottom, String top, Boolean hidden) {
        this.bottom = bottom;
        this.top = top;
        this.hidden = hidden;
        this.created = LocalDateTime.now();
    }

    public UnitDTO toDTO() {
        return  UnitDTO.builder()
                .id(id)
                .bottom(bottom)
                .top(top)
                .build();
    }

    @Override
    public int compareTo(Unit o) {
        int compare = getBottom().compareToIgnoreCase(o.getBottom());
        if (compare == 0 && (getTop() != null && o.getTop() != null)) {
            return getTop().compareToIgnoreCase(o.getTop());
        }
        return compare;
    }
}
