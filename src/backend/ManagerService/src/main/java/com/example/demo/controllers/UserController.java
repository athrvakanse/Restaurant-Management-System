package com.example.demo.controllers;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;
import com.example.demo.entities.User;
import com.example.demo.services.UserService;

@RestController
@RequestMapping("/api3/users")
//@CrossOrigin(origins = "http://localhost:5137") 
public class UserController {

    @Autowired
    private UserService userService;
    

    // Get all users
    @GetMapping("/all")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    // Get user by ID
    @GetMapping("getbyid/{id}")
    public User getUserById(@PathVariable int id) {
        return userService.getById(id).orElse(null);
    }

    // Create a new user (Manager provides role in request)
    @PostMapping("/save")
    public User createUser(@RequestBody User user) {
        return userService.save(user);
    }

    // Update existing user by ID
    @PutMapping("/update/{id}")
    public User updateUser(@PathVariable int id, @RequestBody User userDetails) {
        return userService.updateUserById(id, userDetails);
    }

    // Delete user by ID
    @DeleteMapping("/delete/{id}")
    public void deleteUser(@PathVariable int id) {
        userService.deleteById(id);
    }
    
 // Get all Managers
    @GetMapping("/managers")
    public List<User> getAllManagers() {
        return userService.getAllManagers();
    }

    //Get all Customers
    @GetMapping("/customers")
    public List<User> getAllCustomers() {
        return userService.getAllCustomers();
    }

    //Get all Waiters
    @GetMapping("/waiters")
    public List<User> getAllWaiters() {
        return userService.getAllWaiters();
    }

    // Get all Kitchen Staff
    @GetMapping("/kitchenstaff")
    public List<User> getAllKitchenStaff() {
        return userService.getAllKitchenStaff();
    }
    
 

}
