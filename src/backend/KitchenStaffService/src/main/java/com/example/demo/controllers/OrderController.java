package com.example.demo.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Order;
import com.example.demo.services.OrderService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api2/orders")
public class OrderController {
	@Autowired
	OrderService orderService;
	
	 @GetMapping("/all")
	    public List<Order> getAllOrders() {
	        return orderService.getAllOrders();
	    }

	    @GetMapping("/getbyid/{id}")
	    public Order getOrderById(@PathVariable int id) {
	        return orderService.getOrderById(id);
	    }

	    @PostMapping("/save")
	    public Order addOrder(@RequestBody Order order) {
	        return orderService.addOrder(order);
	    }

	    @PutMapping("/update/{id}")
	    public ResponseEntity<?> updateOrderStatus(@PathVariable int id, @RequestBody Map<String, String> payload) {
	        String newStatus = payload.get("status");
	        orderService.updateOrderStatusOnly(id, newStatus);
	        return ResponseEntity.ok("Order status updated successfully");
	    }

	    
	    @PutMapping("/updatebyid/{id}")
	    public Order updateOrderById(@PathVariable int id, @RequestBody Order order) {
	        return orderService.updateOrderById(id, order);
	    }


	    @DeleteMapping("/delete/{id}")
	    public void deleteOrder(@PathVariable int id) {
	        orderService.deleteOrder(id);
	    }

	 


	    
	    @GetMapping("/bystatus")
	    public List<Order> getOrdersByStatus(@RequestParam String status) {
	        return orderService.getOrdersByStatus(status);
	    }

}

