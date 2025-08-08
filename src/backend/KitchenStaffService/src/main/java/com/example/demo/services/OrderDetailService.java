
package com.example.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.OrderDetail;
import com.example.demo.repositories.OrderDetailRepository;

@Service
public class OrderDetailService {

	@Autowired
	OrderDetailRepository orderDetailRepo;
	
	public List<OrderDetail> getAllOrderDetails() {
        return orderDetailRepo.findAll();
    }



    public OrderDetail getOrderDetailById(int id) {
        return orderDetailRepo.findById(id).orElse(null);
    }

    public OrderDetail addOrderDetail(OrderDetail od) {
        return orderDetailRepo.save(od);
    }

    public OrderDetail updateOrderDetail(OrderDetail od) {
        return orderDetailRepo.save(od);
    }

    public OrderDetail updateOrderDetailById(int id, OrderDetail updated) {
        OrderDetail existing = orderDetailRepo.findById(id).orElse(null);
        if (existing != null) {
            existing.setQty(updated.getQty());
            existing.setD_id(updated.getD_id());
            existing.setO_id(updated.getO_id());
            return orderDetailRepo.save(existing);
        }
        return null;
    }

    public void deleteOrderDetail(int id) {
        orderDetailRepo.deleteById(id);
    }
    

}
