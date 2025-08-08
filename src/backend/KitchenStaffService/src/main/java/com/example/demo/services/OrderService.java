package com.example.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.entities.Order;
import com.example.demo.repositories.OrderRepository;

@Service
public class OrderService {

	@Autowired
	OrderRepository orderRepo;
	
	public List<Order> getAllOrders() {
        return orderRepo.findAll();
    }

    public Order getOrderById(int id) {
        return orderRepo.findById(id).orElse(null);
    }

    public Order addOrder(Order order) {
        return orderRepo.save(order);
    }

    
    
    public Order updateOrderById(int id, Order updatedOrder) {
        Order existing = orderRepo.findById(id).orElse(null);
        if (existing != null) {
            existing.setAmount(updatedOrder.getAmount());
            existing.setPay_mode(updatedOrder.getPay_mode());
            existing.setDate(updatedOrder.getDate());
            existing.setLocalDateTime(updatedOrder.getLocalDateTime());
            existing.setU_id(updatedOrder.getU_id());
            existing.setStatus(updatedOrder.getStatus());
            return orderRepo.save(existing);
        }
        return null;
    }

    public Order updateOrderStatus(int id, String status) {
        Order o = orderRepo.findById(id).orElse(null);
        if (o != null) {
            o.setStatus(status);
            return orderRepo.save(o);
        }
        return null;
    }


    public void deleteOrder(int id) {
        orderRepo.deleteById(id);
    }
	
    
    public List<Order> getOrdersByStatus(String status) {
        return orderRepo.findByStatus(status);
    }
    
    @Transactional
    public void updateOrderStatusOnly(int orderId, String status) {
        orderRepo.updateOrderStatusById(orderId, status);
    }


}


