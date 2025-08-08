package com.example.demo.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Role;
import com.example.demo.services.RoleService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api3/roles")
public class RoleController {
	
	@Autowired
	RoleService roleservice;
	
	@GetMapping("/all")
	public List<Role> getAllRoles(){
		return roleservice.getAllRoles();
	}
	
	@GetMapping("/getbyid/{id}")
	public Optional<Role> getById(@PathVariable int id){
		return roleservice.getRoleById(id);
	}
	
	@PostMapping("/save")
	public Role addRole(@RequestBody Role role) {
		return roleservice.addRole(role);
	}
	
	@PutMapping("/update/{id}")
	public Role updateRole(@PathVariable int id, @RequestBody Role updatedRole) {
	    return roleservice.updateRole(id, updatedRole);
	}

	@DeleteMapping("/delete/{id}")
	public void deleteRole(@PathVariable int id) {
		roleservice.deleteRole(id);
	}

}


