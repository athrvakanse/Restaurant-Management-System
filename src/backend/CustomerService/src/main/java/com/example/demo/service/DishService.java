package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Dish;
import com.example.demo.repository.DishRepository;

@Service
public class DishService {
	
	@Autowired
    private DishRepository dishRepo;
	
    public List<Dish> getAllDishes() {
        return dishRepo.findAll(); // Fetches all dishes with subcategory & category if joined eagerly
    }
}
