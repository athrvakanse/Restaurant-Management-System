package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Order;
import com.example.demo.entities.OrderInfo;
import com.example.demo.entities.OrderTrackingResponse;
import com.example.demo.service.Orderservice;

@RestController
@RequestMapping("/api/orders")
//@CrossOrigin(origins = "http://localhost:5174")
public class OrderController {

    @Autowired
    private Orderservice orderService;

    @PostMapping("/placeorder")
    public ResponseEntity<Order> placeOrder(@RequestBody OrderInfo orderInfo) {
    	//System.out.println("In controller");
    	System.out.println(orderInfo.toString());
        Order placedOrder = orderService.placeOrder(orderInfo);
        return new ResponseEntity<>(placedOrder, HttpStatus.CREATED);
    }
    
    @GetMapping("/track/{orderId}")
    public ResponseEntity<OrderTrackingResponse> trackOrder(@PathVariable Integer orderId) throws NotFoundException {
    	OrderTrackingResponse response = orderService.trackOrder(orderId);
    	return new ResponseEntity<>(response, HttpStatus.OK);
    }
    
    @GetMapping("/trackuser/{userId}")
    public ResponseEntity<List<Order>> getOrdersByUserId(@PathVariable Integer userId) {
        List<Order> orders = orderService.getOrdersByUserId(userId);
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }


    
}
