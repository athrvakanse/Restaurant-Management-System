package com.example.demo.entities;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Table(name="dishes")
public class Dish {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	int d_id;
	float rate;
	String d_name;
	
	@ManyToOne
    @JsonIgnoreProperties("dishes")
    @JoinColumn(name = "s_id") 
	Subcategory s_id;
	
	@ManyToOne
    @JsonIgnoreProperties("dishes")
    @JoinColumn(name = "u_id") 
	User u_id;
	
	@OneToMany(mappedBy = "d_id", cascade = CascadeType.ALL)
    //@JsonIgnoreProperties("d_id")
	@JsonIgnore
    List<OrderDetail> orderDetails = new ArrayList<>();
}
