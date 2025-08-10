package com.example.demo.entities;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.extern.java.Log;

@Entity
@Getter
@Setter
@Table(name = "users")
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "u_id")
    int id;
    
    @Column(nullable = false, unique = true)
    String username;

    @Column(nullable = false, unique = true)
    String password;
    
    @Column(nullable = false)
    String fname;
    
    String mname;
    
    @Column(nullable = false)
    String lname;
    
    @Column(nullable = false, unique = true)
    String email;

    @Column(name = "phone_no", nullable = false, unique = true)
    String phoneNo;

    @Column(name = "aadhar_no", nullable = false, unique = true)
    String aadharNo;

    @Column(name = "profile_photo", nullable = false, length = 1000) // length optional
    private String profilePhoto;


    @Column(nullable = false)
    String gender;

    @Column(nullable = false)
    String address;
  
    @ManyToOne
    @JoinColumn(name = "r_id", nullable = false)
    Role role;
    
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonIgnore
    List<Reservation> reservations;
    
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<OrderDetail> orderDetails;
    
//    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
//    private List<Order> orders;
    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<Order> orders;


    
}
    
    

