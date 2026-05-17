package com.FirstApiChallenge.api.model;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@Embeddable
public class Animal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String name;

    @Column
    private Float weight;

    @Column
    private Float height;

    private Integer age;

    private String race;

    private String history;

}
