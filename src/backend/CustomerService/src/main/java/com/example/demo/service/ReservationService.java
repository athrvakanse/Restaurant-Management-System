package com.example.demo.service;

import com.example.demo.entities.DineTable;
import com.example.demo.entities.Reservation;
import com.example.demo.entities.User;
import com.example.demo.repository.DineTableRepository;
import com.example.demo.repository.ReservationRepository;
import com.example.demo.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final UserRepository userRepository;
    private final DineTableRepository dineTableRepository;

    // Create a reservation
    public Reservation createReservation(Reservation reservation, int userId, int tableId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        DineTable table = dineTableRepository.findById(tableId)
                .orElseThrow(() -> new EntityNotFoundException("Table not found"));

        reservation.setUser(user);
        reservation.setDineTable(table);
        return reservationRepository.save(reservation);
    }

    // Read all reservations
    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    // Get reservations by user ID
    public List<Reservation> getReservationsByUserId(int userId) {
        return reservationRepository.findByUserId(userId);
    }

    // Update reservation
    public Reservation updateReservation(int id, Reservation updatedReservation, int userId, int tableId) {
        Reservation existing = reservationRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Reservation not found"));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        DineTable table = dineTableRepository.findById(tableId)
                .orElseThrow(() -> new EntityNotFoundException("Table not found"));

        // Update the fields of the existing reservation
        existing.setUser(user);
        existing.setDineTable(table);
        existing.setSeatCount(updatedReservation.getSeatCount());
        existing.setDate(updatedReservation.getDate());
        existing.setTime(updatedReservation.getTime());

        return reservationRepository.save(existing);
    }

    // Delete reservation
    public void deleteReservation(int id) {
        if (!reservationRepository.existsById(id)) {
            throw new EntityNotFoundException("Reservation not found");
        }
        reservationRepository.deleteById(id);
    }
}
