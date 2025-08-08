package com.example.demo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Dish;
import com.example.demo.repositories.DishRepository;

@Service
public class DishService {
	@Autowired
	DishRepository drepo;
	
	public Dish addDish(Dish dish) {
        return drepo.save(dish);
    }

    // Read all
    public List<Dish> getAllDishes() {
        return drepo.findAll();
    }

    // Read by ID
    public Optional<Dish> getDishById(int id) {
        return drepo.findById(id);
    }

    // Update
    public Dish updateDish(int id, Dish updatedDish) {
        Dish dish = drepo.findById(id).orElse(null);
        if (dish != null) {
            dish.setD_name(updatedDish.getD_name());
            dish.setRate(updatedDish.getRate());
            dish.setS_id(updatedDish.getS_id());
            dish.setU_id(updatedDish.getU_id());
            return drepo.save(dish);
        }
        return null;
    }

    // Delete
    public void deleteDish(int id) {
        drepo.deleteById(id);
    }
	

}
