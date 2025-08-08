package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Dish;

@Repository
public interface DishRepository extends JpaRepository<Dish, Integer> {

}
