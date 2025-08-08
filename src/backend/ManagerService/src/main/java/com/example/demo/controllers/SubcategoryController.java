package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Subcategory;
import com.example.demo.services.SubcategoryService;

@RestController
@RequestMapping("/api3/subcategories")
public class SubcategoryController {

	@Autowired
	SubcategoryService sserv;
	
	@PostMapping("/save")
    public Subcategory addSubcategory(@RequestBody Subcategory subcategory) {
        return sserv.addSubcategory(subcategory);
    }

    // Read all
    @GetMapping("/all")
    public List<Subcategory> getAllSubcategories() {
        return sserv.getAll();
    }

    // Read by ID
    @GetMapping("/getbyid/{id}")
    public Subcategory getSubcategoryById(@PathVariable int id) {
        return sserv.getSubcategoryById(id).orElse(null);
    }

    // Update
    @PutMapping("/update/{id}")
    public Subcategory updateSubcategory(@PathVariable int id, @RequestBody Subcategory subcategory) {
        return sserv.updateSubcategory(id, subcategory);
    }

    // Delete
    @DeleteMapping("/delete/{id}")
    public void deleteSubcategory(@PathVariable int id) {
        sserv.deleteSubcategory(id);
    }
	
    @GetMapping("/byCategory/{categoryId}")
    public List<Subcategory> getSubcategoriesByCategory(@PathVariable int categoryId) {
        return sserv.getSubcategoriesByCategoryId(categoryId);
    }
}

