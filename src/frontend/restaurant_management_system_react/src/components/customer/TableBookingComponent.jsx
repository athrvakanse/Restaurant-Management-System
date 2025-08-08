import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const BASE_URL = 'http://localhost:7000'; // .NET TableBookingService backend

function TableBookingComponent() {
  const user = useSelector((state) => state.loggedInUser);
  const [tables, setTables] = useState([]);
  const [selectedTableId, setSelectedTableId] = useState('');
  const [bookingTime, setBookingTime] = useState('');

  useEffect(() => {
    async function fetchTables() {
      try {
        const res = await axios.get(`${BASE_URL}/dinetable`);
        setTables(res.data);
      } catch (error) {
        console.error('Error fetching tables:', error);
      }
    }
    fetchTables();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reservation = {
      u_id: user.u_id,
      t_id: parseInt(selectedTableId),
      reservationTime: bookingTime
    };

    try {
      await axios.post(`${BASE_URL}/reservation`, reservation);
      alert('Table booked successfully!');
    } catch (error) {
      console.error('Booking failed:', error);
      alert('Booking failed. Try again.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Book a Table</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Select Table</label>
          <select
            className="form-control"
            value={selectedTableId}
            onChange={(e) => setSelectedTableId(e.target.value)}
            required
          >
            <option value="">-- Select --</option>
            {tables.map((table) => (
              <option key={table.tId} value={table.tId}>
                Table ID {table.tId} - {table.capacity} Seats
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label>Reservation Time</label>
          <input
            type="datetime-local"
            className="form-control"
            value={bookingTime}
            onChange={(e) => setBookingTime(e.target.value)}
            required
          />
        </div>
        <button className="btn btn-primary">Book Table</button>
      </form>
    </div>
  );
}

export default TableBookingComponent;
