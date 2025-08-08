package com.example.demo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Order;
@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {
	
	List<Order> findByStatus(String status);
	
	@Modifying
	@Query("UPDATE Order o SET o.status = :status WHERE o.o_id = :orderId")
	void updateOrderStatusById(@Param("orderId") int orderId, @Param("status") String status);


}


