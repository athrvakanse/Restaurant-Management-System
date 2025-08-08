package com.example.demo.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.LoginCheck;
import com.example.demo.entities.User;
import com.example.demo.services.UserService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api1/user")
public class UserController {
    @Autowired
	UserService userv;

    @GetMapping("/getall")
    public List<User> getAllUsers(){
    	return userv.getAllUsers();
    }

    @GetMapping("/getone")
    public User getById(@RequestParam int id) {
    	return userv.getById(id);
    }

    @PostMapping("/save")
    public User save(@RequestBody User u) {
        return userv.Save(u);
    }



    @PutMapping("/update")
    public User updateUserById(@RequestParam int id,@RequestBody User userDetails) {
    	return userv.updateUserById(id, userDetails);
    }

    @DeleteMapping("/delete")
    public void deleteById(@RequestParam int id) {
        userv.deleteById(id);
    }

    @PostMapping("/login")
    public User checkLogin(@RequestBody LoginCheck loginCheck) {
        return userv.getLogin(loginCheck.getEmail(), loginCheck.getPassword());
    }
    
 // UserController.java

    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        boolean result = userv.handleForgotPassword(email);

        if (result) {
            return ResponseEntity.ok("Reset link sent to your email.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found with this email.");
        }
    }



}


