package com.example.demo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.User;
import com.example.demo.repositories.UserRepository;

@Service
public class UserService {

    @Autowired
    UserRepository urepo;
    


    // Get all users
    public List<User> getAllUsers() {
        return urepo.findAll();
    }

    // Get user by ID
    public Optional<User> getById(int id) {
        return urepo.findById(id);
    }

    // Save user - manager assigns role from frontend
    public User save(User u) {
        return urepo.save(u);  // No default role set
    }

    // Update user by ID
    public User updateUserById(int id, User userDetails) {
        Optional<User> optionalUser = urepo.findById(id);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();

            user.setFname(userDetails.getFname());
            user.setMname(userDetails.getMname());
            user.setLname(userDetails.getLname());
            user.setEmail(userDetails.getEmail());
            user.setPassword(userDetails.getPassword());
            user.setPhone_no(userDetails.getPhone_no());
            user.setAadhar_no(userDetails.getAadhar_no());
            user.setAddress(userDetails.getAddress());
            user.setGender(userDetails.getGender());
            user.setProfile_photo(userDetails.getProfile_photo());

            // Also allow role update if provided
            user.setR_id(userDetails.getR_id());

            return urepo.save(user);
        } else {
            return null;
        }
    }
    
    public List<User> getAllManagers() {
        return urepo.getAllManagers();
    }

    public List<User> getAllCustomers() {
        return urepo.getAllCustomers();
    }

    public List<User> getAllWaiters() {
        return urepo.getAllWaiters();
    }

    public List<User> getAllKitchenStaff() {
        return urepo.getAllKitchenStaff();
    }

    // Delete user by ID
    public void deleteById(int id) {
        urepo.deleteById(id);
    }
    
}
