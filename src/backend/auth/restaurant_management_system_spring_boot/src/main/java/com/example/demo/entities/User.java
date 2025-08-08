package com.example.demo.entities;



import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
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
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name="users")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int u_id;

	String fname;
	String mname;
	String lname;
	String password;
	String email;
	String phone_no;
	String aadhar_no;
	String gender;
	String address;
	@Lob
	String profile_photo;



	@ManyToOne
	@JsonIgnoreProperties("users")
	@JoinColumn(name="r_id")
	Role r_id;

//	@OneToMany(mappedBy = "u_id", cascade = CascadeType.ALL)
//	@JsonIgnore
//	Set<Dish> dishes;

}
