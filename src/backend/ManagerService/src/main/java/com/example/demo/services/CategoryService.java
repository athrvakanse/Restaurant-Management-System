package com.example.demo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Category;
import com.example.demo.repositories.CategoryRepository;

@Service
public class CategoryService {

	@Autowired
	CategoryRepository crepo;
	
	public List<Category> getAllCategories(){
		return crepo.findAll();
	}
	
	public Category addCategory(Category category) {
        return crepo.save(category);
    }
	
	 public Optional<Category> getCategoryById(int id) {
	        return crepo.findById(id);
	    }
	 
	 public Category updateCategory(int id, Category updatedCategory) {
		    Category category = crepo.findById(id).orElse(null);
		    if (category != null) {
		        category.setC_name(updatedCategory.getC_name());
		        return crepo.save(category);
		    }
		    return null;
		}

	 public void deleteCategory(int id) {
		    crepo.deleteById(id);
		}

}

