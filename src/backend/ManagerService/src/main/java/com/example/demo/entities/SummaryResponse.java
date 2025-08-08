package com.example.demo.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SummaryResponse {

	private long totalUsers;
    private long totalDishes;
    private long totalCategories;
    private long totalSubcategories;
}
