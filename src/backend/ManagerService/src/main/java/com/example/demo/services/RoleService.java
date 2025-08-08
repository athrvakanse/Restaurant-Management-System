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
    private RoleRepository roleRepo;

    // CREATE
    public Role addRole(Role role) {
        return roleRepo.save(role);
    }

    // READ - all
    public List<Role> getAllRoles() {
        return roleRepo.findAll();
    }

    // READ - by ID
    public Optional<Role> getRoleById(int id) {
        return roleRepo.findById(id);
    }

    // UPDATE
    public Role updateRole(int id, Role updatedRole) {
        Optional<Role> optionalRole = roleRepo.findById(id);

        if (optionalRole.isPresent()) {
            Role role = optionalRole.get();
            role.setR_name(updatedRole.getR_name());
            return roleRepo.save(role);
        } else {
            return null;
        }
    }


    // DELETE
    public void deleteRole(int id) {
        roleRepo.deleteById(id);
    }

}
