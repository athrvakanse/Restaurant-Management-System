package com.example.demo.entities;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "dine_tables")
@Getter
@Setter

public class DineTable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "t_id") // ✅ match column
    int t_id;

    @Column(nullable = false)
    int capacity;
    
    @Column(name = "availability_status", nullable = false) // ✅ fixed spelling
    private String availability_status;

    
    @OneToMany(mappedBy = "dineTable", cascade = CascadeType.ALL, orphanRemoval = true)
    List<Reservation> reservations;
    
    
}
