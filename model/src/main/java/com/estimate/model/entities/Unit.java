package com.estimate.model.entities;

import com.estimate.model.entities.dto.UnitDTO;
import com.estimate.model.entities.utils.Role;
import com.estimate.model.entities.utils.SimpleEntity;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static javax.persistence.GenerationType.SEQUENCE;

@Table(name = "unit")
@Entity
@Data
public class Unit implements SimpleEntity<Unit> {
    @Id
    @GeneratedValue(strategy=SEQUENCE, generator="unit_id")
    @Column(name = "id")
    private Long id;

    @Column(name = "bottom")
    private String bottom;

    @Column(name = "top")
    private String top;

    @Enumerated(EnumType.STRING)
    @Column(name = "role")
    private Role role;

    @OneToMany(mappedBy="unit")
    private List<AbstractMaterial> materials;

    @Column(name = "isActual")
    private Boolean actual;

    @Column(name = "created")
    private LocalDateTime created;

    @ManyToOne(cascade={CascadeType.ALL})
    @JoinColumn(name="parent")
    private Unit parent;

    @OneToMany(mappedBy="parent")
    private Set<Unit> children = new HashSet<>();

    @ManyToOne
    @JoinColumn(name="user_id", nullable=false)
    private User user;

    public Unit() {

    }

    public Unit(String bottom, String top, Role role, Boolean actual) {
        this.bottom = bottom;
        this.top = top;
        this.role = role;
        this.actual = actual;
        this.created = LocalDateTime.now();
    }

    public UnitDTO toDTO(){
        return new UnitDTO(id,bottom,top,role,actual,user.getId());
    }
}
