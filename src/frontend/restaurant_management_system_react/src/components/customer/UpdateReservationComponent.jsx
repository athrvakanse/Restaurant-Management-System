import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function UpdateReservationComponent() {
  const { id, userId, tableId } = useParams();  // Retrieve URL params: id, userId, tableId
  const [reservation, setReservation] = useState({
    seatCount: '',
    date: '',
    time: '',
    dineTable: { t_id: '', capacity: '' },
  });  // Initialize the reservation state with default empty values
  const [loading, setLoading] = useState(true);  // Loading state

  const navigate = useNavigate();  // Use navigate to redirect after update

  useEffect(() => {
    // Fetch reservation data based on the reservation id
    fetch(`http://localhost:8081/api/reservations/${id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setReservation({
            seatCount: data.seatCount || '',
            date: data.date || '',
            time: data.time || '',
            dineTable: data.dineTable || { t_id: '', capacity: '' },
          });
        }
        setLoading(false);  // Stop loading after data is fetched
      })
      .catch((err) => {
        console.error('Error fetching reservation:', err);
        setLoading(false);  // Stop loading if error
      });
  }, [id]);  // Re-run effect when `id` changes

  const handleSubmit = (e) => {
    e.preventDefault();  // Prevent default form submission

    const updatedReservation = {
      seatCount: reservation.seatCount,
      date: reservation.date,
      time: reservation.time,
      dineTable: { t_id: tableId },  // Update table ID from the URL params
      user: { id: userId },  // Update user ID from the URL params
    };

    // Send the updated reservation data to the backend
    fetch(`http://localhost:8081/api/reservations/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedReservation),
    })
      .then((response) => {
        if (response.ok) {
          alert(`Reservation #${id} updated successfully.`);
          navigate(`/customer/home/reservations/view`);  // Redirect after update
        } else {
          alert('Failed to update reservation.');
        }
      })
      .catch((error) => {
        console.error('Error updating reservation:', error);
        alert('Failed to update reservation.');
      });
  };

  return (
    <div className="container mt-4">
      <h3>Update Reservation #{id}</h3>

      {loading ? (
        <p>Loading reservation...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="seatCount" className="form-label">Seat Count</label>
            <input
              type="number"
              id="seatCount"
              className="form-control"
              value={reservation.seatCount || ''}  // Ensure it's always controlled
              onChange={(e) => setReservation({ ...reservation, seatCount: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="date" className="form-label">Date</label>
            <input
              type="date"
              id="date"
              className="form-control"
              value={reservation.date || ''}  // Ensure it's always controlled
              onChange={(e) => setReservation({ ...reservation, date: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="time" className="form-label">Time</label>
            <input
              type="time"
              id="time"
              className="form-control"
              value={reservation.time || ''}  // Ensure it's always controlled
              onChange={(e) => setReservation({ ...reservation, time: e.target.value })}
            />
          </div>

          <button type="submit" className="btn btn-primary">Update</button>
        </form>
      )}
    </div>
  );
}

export default UpdateReservationComponent;
