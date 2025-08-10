package com.example.demo.entities;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import com.example.demo.enums.PaymentMode;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "o_id")
    private int o_id;

    @ManyToOne
    @JoinColumn(name = "u_id", nullable = false)
    private User user;
    
    private String status ;
   
    private LocalDateTime localDateTime;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal amount;

    @Column(name = "pay_mode")
    @Enumerated(EnumType.STRING)
    private PaymentMode payMode;

    @Column(name = "date", nullable = false)
    private LocalDate date;

    @JsonIgnore
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<OrderDetail> orderDetails;	
}
