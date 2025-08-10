package com.example.demo.entities;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderTrackingResponse {
	
	 private Integer orderId;
	    private Integer userId;
	    private BigDecimal amount;
	    private String paymentMode;
	    private String status;
	    private LocalDateTime orderTime;
	    private List<DishItem> items;

	    @Getter
	    @Setter
	    @NoArgsConstructor
	    @AllArgsConstructor
	    public static class DishItem {
	        private String dishName;
	        private Integer quantity;
	        private BigDecimal price;
	    }

}
