package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.SummaryResponse;
import com.example.demo.services.DashboardService;

//@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api3/dashboard")
public class DashboardController {

	@Autowired
    private DashboardService dashboardService;

    @GetMapping("/summary")
    public SummaryResponse getSummary() {
        return dashboardService.getSummary();
    }
}
