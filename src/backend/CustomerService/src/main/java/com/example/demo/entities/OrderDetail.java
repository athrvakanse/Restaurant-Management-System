package com.example.demo.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@Entity
@Table(name = "order_details")
public class OrderDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "od_id")
    private Integer id;

//    @ManyToOne
//    @JoinColumn(name = "o_id", nullable=false) // ✅ FK to Order.o_id
//    private Order order;
    
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;


    private int qty;
    
    @ManyToOne
    @JoinColumn(name = "d_id")
    private Dish dish;

    @ManyToOne
    @JoinColumn(name = "u_id")
    private User user;

    // Getters & Setters
}
