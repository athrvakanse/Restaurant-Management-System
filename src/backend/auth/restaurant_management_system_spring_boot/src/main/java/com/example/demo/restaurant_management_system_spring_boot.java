package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class restaurant_management_system_spring_boot {

	public static void main(String[] args) {
		SpringApplication.run(restaurant_management_system_spring_boot.class, args);
	}

}


