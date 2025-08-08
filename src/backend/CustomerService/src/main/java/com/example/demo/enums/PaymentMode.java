package com.example.demo.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum PaymentMode {
    CASH,
    CARD,
    UPI;

    @JsonCreator
    public static PaymentMode fromJson(String value) {
        if (value == null) return null;
        return PaymentMode.valueOf(value.trim().toUpperCase());
    }

    @JsonValue
    public String toJson() {
        return this.name();  // or this.name().toLowerCase() if you want lowercase in JSON response
    }
}
