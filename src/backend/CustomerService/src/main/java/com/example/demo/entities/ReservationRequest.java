package com.example.demo.entities;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter

public class ReservationRequest {
	
	    private Integer userId;
	    private Integer dineTableId;
	    private LocalDate date;
	    private LocalDate time;
	    private int seatCount;
		
	}



