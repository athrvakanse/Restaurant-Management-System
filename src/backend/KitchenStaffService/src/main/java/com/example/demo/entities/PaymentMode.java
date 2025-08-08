package com.example.demo.entities;

import com.fasterxml.jackson.annotation.JsonValue;

public enum PaymentMode {
	
	CASH,
	CARD,
	UPI;
	
	public static PaymentMode fromJson(String value) {
		if(value==null) return null;
		return PaymentMode.valueOf(value.trim().toUpperCase());
	}
	
	@JsonValue
	public String toJson() {
		return this.name();
	}
}
