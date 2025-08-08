package com.example.demo.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
@Table(name="subcategories")
public class Subcategory {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int s_id;
	
	String s_name;
	
	
	 @ManyToOne
	 @JsonIgnoreProperties("subCategories")
	 @JoinColumn(name = "c_id")
	 Category c_id;

}
