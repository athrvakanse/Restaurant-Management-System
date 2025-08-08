package com.example.demo.entities;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
@Table(name="categories")
public class Category {
	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
		int c_id;
		
		String c_name;
		
		@OneToMany(mappedBy = "c_id")
	    //@JsonIgnoreProperties("c_id")
		@JsonIgnore
	    List<Subcategory> subCategories = new ArrayList<>();
		

}
