package com.example.demo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Dish;

@Repository
public interface DishRepository extends JpaRepository<Dish, Integer> {
	@Query("SELECT d FROM Dish d WHERE d.s_id.s_id = :subCategoryId")
	List<Dish> findBySubcategoryId(int subCategoryId);

}
