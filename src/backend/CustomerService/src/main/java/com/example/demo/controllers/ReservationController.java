package com.example.demo.controllers;

import com.example.demo.entities.Reservation;
import com.example.demo.service.ReservationService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/reservations")
@RequiredArgsConstructor
// adjust to your frontend port
public class ReservationController {

    private final ReservationService reservationService;

    @PostMapping("/create/{userId}/{tableId}")
    public ResponseEntity<Reservation> createReservation(
            @RequestBody Reservation reservation,
            @PathVariable int userId,
            @PathVariable int tableId) {
        Reservation createdReservation = reservationService.createReservation(reservation, userId, tableId);
        return ResponseEntity.ok(createdReservation);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Reservation>> getAllReservations() {
        return ResponseEntity.ok(reservationService.getAllReservations());
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<Reservation>> getReservationsByUserId(@PathVariable int userId) {
        List<Reservation> reservations = reservationService.getReservationsByUserId(userId);
        if (reservations == null) {
            reservations = Collections.emptyList();
        }
        return ResponseEntity.ok(reservations);
    }

    @PutMapping("/update/{id}/{userId}/{tableId}")
    public ResponseEntity<Reservation> updateReservation(
            @PathVariable int id,
            @RequestBody Reservation updatedReservation,
            @PathVariable int userId,
            @PathVariable int tableId) {
        try {
            Reservation updated = reservationService.updateReservation(id, updatedReservation, userId, tableId);
            return ResponseEntity.ok(updated);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(404).body(null);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteReservation(@PathVariable int id) {
        try {
            reservationService.deleteReservation(id);
            return ResponseEntity.ok("Reservation deleted successfully.");
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(404).body("Reservation not found.");
        }
    }
}
