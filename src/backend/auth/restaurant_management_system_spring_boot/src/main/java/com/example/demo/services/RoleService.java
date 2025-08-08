package com.example.demo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Role;
import com.example.demo.repositories.RoleRepository;

@Service
public class RoleService {
	@Autowired
	RoleRepository rrepo;


	public List<Role> getAllRoles(){
		return rrepo.findAll();
	}

	public Role saveRole(Role r) {
		return rrepo.save(r);
	}

	public Role updateRoleById(int id,Role roleDetails) {
		Optional<Role> byId= rrepo.findById(id);
		if(byId.isPresent()) {
			Role role=byId.get();
			role.setR_id(role.getR_id());
			role.setR_name(role.getR_name());
			return rrepo.save(role);
		}else {
			return null;
		}
	}

	public void deleteRoleById(int id) {
		rrepo.deleteById(id);
	}
}

