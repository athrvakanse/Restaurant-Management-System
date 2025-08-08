package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.OrderDetail;
import com.example.demo.services.OrderDetailService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api2/orderdetails")
public class OrderDetailController {
	
	@Autowired
	OrderDetailService orderDetailService;

	
	@GetMapping("/all")
    public List<OrderDetail> getAllOrderDetails() {
        return orderDetailService.getAllOrderDetails();
    }

    @GetMapping("/getbyid/{id}")
    public OrderDetail getOrderDetailById(@PathVariable int id) {
        return orderDetailService.getOrderDetailById(id);
    }

    @PostMapping("/save")
    public OrderDetail addOrderDetail(@RequestBody OrderDetail od) {
        return orderDetailService.addOrderDetail(od);
    }

    @PutMapping("/update")
    public OrderDetail updateOrderDetail(@RequestBody OrderDetail od) {
        return orderDetailService.updateOrderDetail(od);
    }
    
    @PutMapping("/updatebyid/{id}")
    public OrderDetail updateOrderDetailById(@PathVariable int id, @RequestBody OrderDetail od) {
        return orderDetailService.updateOrderDetailById(id, od);
    }
    


    @DeleteMapping("/delete/{id}")
    public void deleteOrderDetail(@PathVariable int id) {
        orderDetailService.deleteOrderDetail(id);
    }
    

}

