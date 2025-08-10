package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entities.DineTable;

public interface DineTableRepository extends JpaRepository<DineTable, Integer>{

}
