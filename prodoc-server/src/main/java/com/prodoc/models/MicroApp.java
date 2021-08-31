package com.prodoc.models;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.Size;

@Entity
@Data
@Table(name = "micro_apps")
public class MicroApp {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Size(max=50)
    @Column(length=50)
    private String name;

    @Size(max = 150)
    @Column(length=150)
    private String description;

}
