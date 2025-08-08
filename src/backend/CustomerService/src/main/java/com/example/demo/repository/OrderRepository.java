package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Order;
import com.example.demo.entities.OrderDetail;
import com.example.demo.entities.Reservation;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {
	
	List<Order> findByUserId(Integer userId);

}
