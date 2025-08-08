package com.example.demo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Category;
import com.example.demo.entities.Subcategory;
import com.example.demo.repositories.SubcategoryRepository;

@Service
public class SubcategoryService {

	@Autowired
	SubcategoryRepository srepo;
	@Autowired
	CategoryService cserv;
	
	public List<Subcategory> getAll(){
		return srepo.findAll();
	}
	
	public Subcategory addSubcategory(Subcategory subcategory) {
        return srepo.save(subcategory);
    }
	
	 public Optional<Subcategory> getSubcategoryById(int id) {
	        return srepo.findById(id);
	    }
	
	 public Subcategory updateSubcategory(int id, Subcategory updatedSubcategory) {
	        Subcategory sub = srepo.findById(id).orElse(null);
	        if (sub != null) {
	            sub.setS_name(updatedSubcategory.getS_name());
	            Integer catid=updatedSubcategory.getC_id().getC_id();
	            Category category=cserv.getCategoryById(catid).orElse(null);
	            sub.setC_id(category); // Update category if needed
	            return srepo.save(sub);
	        }
	        return null;
	    }
	
	 public void deleteSubcategory(int id) {
	        srepo.deleteById(id);
	    }
	 
	 public List<Subcategory> getSubcategoriesByCategoryId(int categoryId) {
	        return srepo.findByCategory_C_id(categoryId);
	    }
   }

