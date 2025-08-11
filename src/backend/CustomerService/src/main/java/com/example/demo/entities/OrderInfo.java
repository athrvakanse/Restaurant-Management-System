package com.example.demo.entities;

import com.example.demo.enums.PaymentMode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

//@Getter
//@Setter
@ToString
public class OrderInfo {
	
    private int u_id;
    private double amount;
    private PaymentMode pay_mode;
    private String status; // Optional
    private List<OrderDetailsDummy> dishlist;
    
	public int getU_id() {
		return u_id;
	}
	public void setU_id(int u_id) {
		this.u_id = u_id;
	}
	public double getAmount() {
		return amount;
	}
	public void setAmount(double amount) {
		this.amount = amount;
	}
	public PaymentMode getPay_mode() {
		return pay_mode;
	}
	public void setPay_mode(PaymentMode pay_mode) {
		this.pay_mode = pay_mode;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public List<OrderDetailsDummy> getDishlist() {
		return dishlist;
	}
	public void setDishlist(List<OrderDetailsDummy> dishlist) {
		this.dishlist = dishlist;
	}
    
}
