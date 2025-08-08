package com.example.demo.controllers;

import java.util.List;

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

import com.example.demo.entities.Dish;
import com.example.demo.services.DishService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api2/dishes")
public class DishController {
	
	@Autowired
	DishService dishService;
	
	 @GetMapping("/all")
	    public List<Dish> getAllDishes() {
	        return dishService.getAllDishes();
	    }

	    @GetMapping("/getbyid/{id}")
	    public Dish getDishById(@PathVariable int id) {
	        return dishService.getDishById(id);
	    }

	    @PostMapping("/save")
	    public Dish addDish(@RequestBody Dish dish) {
	        return dishService.addDish(dish);
	    }

	    @PutMapping("/update")
	    public Dish updateDish(@RequestBody Dish dish) {
	        return dishService.updateDish(dish);
	    }
	    
	    @PutMapping("/updatebyid/{id}")
	    public Dish updateDishById(@PathVariable int id, @RequestBody Dish dish) {
	        return dishService.updateDishById(id, dish);
	    }

	    @DeleteMapping("/delete/{id}")
	    public void deleteDish(@PathVariable int id) {
	        dishService.deleteDish(id);
	    }
	    
}
