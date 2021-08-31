package com.prodoc.models;

import com.prodoc.utility.UserRole;
import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "roles")
@Data
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private UserRole name;

    public Role() {

    }
    public Role(UserRole name) {
        this.name = name;
    }
}
