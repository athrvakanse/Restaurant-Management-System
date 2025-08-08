package com.example.demo.entities;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Table(name="orders")
public class Order {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int o_id;
	
	BigDecimal amount;
	
	@Enumerated(EnumType.STRING)
	PaymentMode pay_mode;
	
	String status;
	
	@Column(name="localDateTime")
	LocalDateTime localDateTime;
	
	@Column(name="date")
	LocalDate date;
	
	
	
	@ManyToOne
    @JoinColumn(name = "u_id", nullable = false)
	@JsonIgnoreProperties("orders")
	User u_id;
	
	@OneToMany(mappedBy = "o_id", cascade = CascadeType.ALL)
   // @JsonIgnoreProperties("o_id")
	@JsonIgnore
    List<OrderDetail> orderDetails = new ArrayList<>();

}


