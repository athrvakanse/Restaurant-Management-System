package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Reservation;
@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Integer>{
	List<Reservation> findByUserId(int userId);
}
