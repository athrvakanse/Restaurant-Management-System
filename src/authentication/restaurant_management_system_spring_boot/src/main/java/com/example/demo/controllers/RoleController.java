package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Role;
import com.example.demo.services.RoleService;

@RestController
@RequestMapping("/role")
public class RoleController {
	@Autowired
	RoleService rserv;

	@GetMapping("/getall")
	public List<Role> getAllRoles(){
		return rserv.getAllRoles();
	}

	@PostMapping("/save")
	public Role saveRole(@RequestBody Role r) {
		return rserv.saveRole(r);
	}

	@PutMapping("/update")
	public Role updateRoleById(@RequestParam int id,@RequestBody Role roleDetails) {
		return rserv.updateRoleById(id, roleDetails);
	}

	@DeleteMapping("/delete/{id}")
	public void deleteRoleById(@PathVariable int id) {
		rserv.deleteRoleById(id);
	}
}



