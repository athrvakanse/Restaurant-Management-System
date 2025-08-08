package com.example.demo.controllers;

import java.util.List;
import java.util.Optional;

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

import com.example.demo.entities.Category;
import com.example.demo.services.CategoryService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api3/categories")
public class CategoryController {
	@Autowired
	CategoryService cserv;
	
	@GetMapping("/all")
	public List<Category> getallCategories(){
		return cserv.getAllCategories();
	}
	
	@GetMapping("/getbyid/{id}")
	public Optional<Category> getCategoryById(@PathVariable int id){
		return cserv.getCategoryById(id);
	}
	
	@PostMapping("/save")
	public Category addCategory(@RequestBody Category category) {
		return cserv.addCategory(category);
	}
	
	@PutMapping("/update/{id}")
	public Category updateCategory(@PathVariable int id,@RequestBody Category category) {
		return cserv.updateCategory(id, category);
	}
	
	
	@DeleteMapping("/delete/{id}")
	public void deleteCategory(@PathVariable int id) {
	     cserv.deleteCategory(id);
	}
	
}

