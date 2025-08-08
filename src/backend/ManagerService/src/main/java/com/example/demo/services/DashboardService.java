package com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.SummaryResponse;
import com.example.demo.repositories.CategoryRepository;
import com.example.demo.repositories.DishRepository;
import com.example.demo.repositories.SubcategoryRepository;
import com.example.demo.repositories.UserRepository;

@Service
public class DashboardService {

	@Autowired
    private UserRepository userRepo;

    @Autowired
    private DishRepository dishRepo;

    @Autowired
    private CategoryRepository categoryRepo;

    @Autowired
    private SubcategoryRepository subcategoryRepo;

    public SummaryResponse getSummary() {
        long totalUsers = userRepo.count();
        long totalDishes = dishRepo.count();
        long totalCategories = categoryRepo.count();
        long totalSubcategories = subcategoryRepo.count();

        return new SummaryResponse(totalUsers, totalDishes, totalCategories, totalSubcategories);
    }
}
