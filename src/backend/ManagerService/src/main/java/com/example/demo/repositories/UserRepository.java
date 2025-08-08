package com.example.demo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
	 @Query("SELECT u FROM User u WHERE u.r_id.r_name = 'Manager'")
	    List<User> getAllManagers();

	    @Query("SELECT u FROM User u WHERE u.r_id.r_name = 'Customer'")
	    List<User> getAllCustomers();

	    @Query("SELECT u FROM User u WHERE u.r_id.r_name = 'Waiter'")
	    List<User> getAllWaiters();

	    @Query("SELECT u FROM User u WHERE u.r_id.r_name = 'Kitchen Staff'")
	    List<User> getAllKitchenStaff();

}

