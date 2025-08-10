package com.example.demo.entities;

import jakarta.persistence.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "subcategories")
public class SubCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "s_id")
    private Integer id;

    @Column(name = "s_name", nullable = false)
    private String name;

    @ManyToOne
    @JoinColumn(name = "c_id", nullable = false)
    @JsonIgnore
    private Category category;
}
