//package com.example.demo.service;
//
//import java.math.BigDecimal;
//import java.time.LocalDate;
//import java.util.ArrayList;
//import java.util.List;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
//import org.springframework.stereotype.Service;
//
//import com.example.demo.entities.Dish;
//import com.example.demo.entities.Order;
//import com.example.demo.entities.OrderDetail;
//import com.example.demo.entities.OrderDetailsDummy;
//import com.example.demo.entities.OrderInfo;
//import com.example.demo.entities.OrderTrackingResponse;
//import com.example.demo.entities.User;
//import com.example.demo.repository.DishRepository;
//import com.example.demo.repository.OrderDetailRepository;
//import com.example.demo.repository.OrderRepository;
//import com.example.demo.repository.UserRepository;
//
//import jakarta.persistence.EntityManager;
//import jakarta.transaction.Transactional;
//
//@Service
//public class Orderservice {
//
//    @Autowired
//    private OrderRepository orderRepo;
//
//    @Autowired
//    private OrderDetailRepository orderDetailRepo;
//
//    @Autowired
//    private DishRepository dishRepo;
//
//    @Autowired
//    private UserRepository userRepo;
//
//    @Autowired
//    private EntityManager entityManager;
//
//    @Transactional
//    public Order placeOrder(OrderInfo orderInfo) {
//        User user = userRepo.findById(orderInfo.getUid())
//                .orElseThrow(() -> new RuntimeException("User not found"));
//
//        Order order = new Order();
//        order.setUser(user);
//        order.setAmount(BigDecimal.valueOf(orderInfo.getAmount()));
//        order.setPayMode(orderInfo.getPay_mode());
//        order.setDate(LocalDate.now());
//
//        Order savedOrder = orderRepo.save(order);
//
//        // ✅ Force insert to execute and o_id to be generated
//        entityManager.flush();
//
//        List<OrderDetail> detailList = new ArrayList<>();
//        for (OrderDetailsDummy dummy : orderInfo.getDishlist()) {
//            Dish dish = dishRepo.findById(dummy.getD_id())
//                    .orElseThrow(() -> new RuntimeException("Dish not found"));
//
//            OrderDetail detail = new OrderDetail();
//            detail.setDish(dish);
//            detail.setQty(dummy.getQty());
//            detail.setOrder(savedOrder); // ✅ o_id will now be available
//            detail.setUser(user);
//
//            orderDetailRepo.save(detail);
//            detailList.add(detail);
//        }
//
//        savedOrder.setOrderDetails(detailList);
//        return savedOrder;
//    }
//    
//    public OrderTrackingResponse trackOrder(Integer orderId) throws NotFoundException {
//        Order order = orderRepo.findById(orderId)
//            .orElseThrow(() -> new NotFoundException());
//
//        OrderTrackingResponse response = new OrderTrackingResponse();
//        response.setOrderId(order.getO_id());
//        response.setUserId(order.getUser().getId());
//        response.setAmount(order.getAmount());
//        response.setPaymentMode(order.getPayMode().toString());
//        response.setStatus(order.getStatus().toString());
//        response.setOrderTime(order.getLocalDateTime());
//
//        List<OrderTrackingResponse.DishItem> dishItems = order.getOrderDetails().stream().map(detail -> {
//            OrderTrackingResponse.DishItem item = new OrderTrackingResponse.DishItem();
//            item.setDishName(detail.getDish().getName());
//            item.setQuantity(detail.getQty());
//            item.setPrice(detail.getDish().getRate());
//            return item;
//        }).toList();
//
//        response.setItems(dishItems);
//        return response;
//    }
//
//
//
//}

package com.example.demo.service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.stereotype.Service;

import com.example.demo.entities.*;
import com.example.demo.repository.*;

import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;

@Service
public class Orderservice {

    @Autowired
    private OrderRepository orderRepo;

    @Autowired
    private OrderDetailRepository orderDetailRepo;

    @Autowired
    private DishRepository dishRepo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private EntityManager entityManager;

    @Transactional
    public Order placeOrder(OrderInfo orderInfo) {
        User user = userRepo.findById(orderInfo.getU_id())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Order order = new Order();
        order.setUser(user);
        order.setAmount(BigDecimal.valueOf(orderInfo.getAmount()));
        order.setPayMode(orderInfo.getPay_mode());
        order.setDate(LocalDate.now());
        order.setLocalDateTime(LocalDateTime.now());
        order.setStatus(orderInfo.getStatus() != null ? orderInfo.getStatus() : "PENDING");

        Order savedOrder = orderRepo.save(order);

        entityManager.flush();

        List<OrderDetail> detailList = new ArrayList<>();
        for (OrderDetailsDummy dummy : orderInfo.getDishlist()) {
            Dish dish = dishRepo.findById(dummy.getD_id())
                    .orElseThrow(() -> new RuntimeException("Dish not found"));

            OrderDetail detail = new OrderDetail();
            detail.setDish(dish);
            detail.setQty(dummy.getQty());
            detail.setOrder(savedOrder);
//            detail.setUser(user);

            orderDetailRepo.save(detail);
            detailList.add(detail);
        }

        savedOrder.setOrderDetails(detailList);
        return savedOrder;
    }

    public OrderTrackingResponse trackOrder(Integer orderId) throws NotFoundException {
        Order order = orderRepo.findById(orderId)
                .orElseThrow(() -> new NotFoundException());

        OrderTrackingResponse response = new OrderTrackingResponse();
        response.setOrderId(order.getO_id());
        response.setUserId(order.getUser().getId());
        response.setAmount(order.getAmount());
        response.setPaymentMode(order.getPayMode().toString());
        response.setStatus(order.getStatus());
        response.setOrderTime(order.getLocalDateTime());

        List<OrderTrackingResponse.DishItem> dishItems = order.getOrderDetails().stream().map(detail -> {
            OrderTrackingResponse.DishItem item = new OrderTrackingResponse.DishItem();
            item.setDishName(detail.getDish().getName());
            item.setQuantity(detail.getQty());
            item.setPrice(detail.getDish().getRate());
            return item;
        }).toList();

        response.setItems(dishItems);
        return response;
    }
    
    public List<Order> getOrdersByUserId(Integer userId) {
        return orderRepo.findByUserId(userId);  // Fetch orders by user ID
    }
}

