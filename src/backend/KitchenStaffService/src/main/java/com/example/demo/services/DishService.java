package com.example.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Dish;
import com.example.demo.repositories.DishRepository;

@Service
public class DishService {
	
	@Autowired
	DishRepository dishRepo;
	
	 public List<Dish> getAllDishes() {
	        return dishRepo.findAll();
	    }

	    public Dish getDishById(int id) {
	        return dishRepo.findById(id).orElse(null);
	    }

	    public Dish addDish(Dish dish) {
	        return dishRepo.save(dish);
	    }

	    public Dish updateDish(Dish dish) {
	        return dishRepo.save(dish);
	    }
	    
	    public Dish updateDishById(int id, Dish updated) {
	        Dish existing = dishRepo.findById(id).orElse(null);
	        if (existing != null) {
	            existing.setD_name(updated.getD_name());
	            existing.setRate(updated.getRate());
	            existing.setS_id(updated.getS_id());
	            existing.setU_id(updated.getU_id());
	            return dishRepo.save(existing);
	        }
	        return null;
	    }


	    public void deleteDish(int id) {
	        dishRepo.deleteById(id);
	    }
	   

}

