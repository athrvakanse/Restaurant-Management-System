package com.example.demo.controllers;

import com.example.demo.entities.Reservation;
import com.example.demo.service.ReservationService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservations")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5174") // Allow requests from your frontend port
public class ReservationController {

    private final ReservationService reservationService;

    // Create reservation
    @PostMapping("/create/{userId}/{tableId}")
    public ResponseEntity<Reservation> createReservation(@RequestBody Reservation reservation,
                                                         @PathVariable int userId,
                                                         @PathVariable int tableId) {
        Reservation createdReservation = reservationService.createReservation(reservation, userId, tableId);
        return ResponseEntity.ok(createdReservation); // Respond with the created reservation
    }

    // Get all reservations
    @GetMapping("/all")
    public ResponseEntity<List<Reservation>> getAllReservations() {
        List<Reservation> reservations = reservationService.getAllReservations();
        return ResponseEntity.ok(reservations); // Respond with the list of all reservations
    }

    // Get reservations by user ID
    @GetMapping("/{userId}")
    public ResponseEntity<List<Reservation>> getReservationsByUserId(@PathVariable int userId) {
        List<Reservation> reservations = reservationService.getReservationsByUserId(userId);
        return ResponseEntity.ok(reservations); // Respond with reservations for a specific user
    }

    // Update reservation
    @PutMapping("/update/{id}/{userId}/{tableId}")
    public ResponseEntity<Reservation> updateReservation(@PathVariable int id,
                                                         @RequestBody Reservation updatedReservation,
                                                         @PathVariable int userId,
                                                         @PathVariable int tableId) {
        try {
            Reservation updated = reservationService.updateReservation(id, updatedReservation, userId, tableId);
            return ResponseEntity.ok(updated); // Respond with the updated reservation
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(404).body(null); // Respond with 404 if not found
        }
    }

    // Delete reservation
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteReservation(@PathVariable int id) {
        try {
            reservationService.deleteReservation(id);
            return ResponseEntity.ok("Reservation deleted successfully."); // Respond with success message
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(404).body("Reservation not found."); // Respond with error message if not found
        }
    }
}
