package com.example.demo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Subcategory;

@Repository
public interface SubcategoryRepository extends JpaRepository<Subcategory, Integer> {
	@Query("SELECT s FROM Subcategory s WHERE s.c_id.c_id = :categoryId")
	 List<Subcategory> findByCategory_C_id(int categoryId);
	
}
