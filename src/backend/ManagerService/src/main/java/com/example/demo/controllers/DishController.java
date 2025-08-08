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

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api3/dishes")
public class DishController {
	@Autowired
	DishService dserv;
	
	 @PostMapping("/save")
	    public Dish addDish(@RequestBody Dish dish) {
	        return dserv.addDish(dish);
	    }

	    // Read all
	    @GetMapping("/all")
	    public List<Dish> getAllDishes() {
	        return dserv.getAllDishes();
	    }

	    @GetMapping("/getbyid/{id}")
	    public Dish getDishById(@PathVariable int id) {
	        return dserv.getDishById(id).orElse(null);
	    }


	    // Update
	    @PutMapping("/update/{id}")
	    public Dish updateDish(@PathVariable int id, @RequestBody Dish dish) {
	        return dserv.updateDish(id, dish);
	    }

	    // Delete
	    @DeleteMapping("delete/{id}")
	    public void deleteDish(@PathVariable int id) {
	        dserv.deleteDish(id);
	    }
	
	
}
