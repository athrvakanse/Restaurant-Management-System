package com.example.demo.entities;

import com.example.demo.enums.PaymentMode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class OrderInfo {
    private int uid;
    private double amount;
    private PaymentMode pay_mode;
    private String status; // Optional
    private List<OrderDetailsDummy> dishlist;
}
