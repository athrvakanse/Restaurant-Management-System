package com.example.demo.entities;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderRequest {
	
	private Integer userId;
    private Integer dineTableId;
    private List<Item> items;

    @Getter
    @Setter
    public static class Item {
        private Integer dishId;
        private int qty;
    }
    
}
