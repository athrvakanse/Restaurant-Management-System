package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Dish;
import com.example.demo.service.DishService;

@RestController
@RequestMapping("/api/menu")
@CrossOrigin(origins = "http://localhost:5174")
public class DishController {
	
	@Autowired
    private DishService dishService;

    @GetMapping
    public ResponseEntity<List<Dish>> viewMenu() {
        return ResponseEntity.ok(dishService.getAllDishes());
    }
	

}
