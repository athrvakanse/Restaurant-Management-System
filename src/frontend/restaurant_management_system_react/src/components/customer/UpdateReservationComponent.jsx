import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function UpdateReservationComponent() {
  const { id, userId, tableId } = useParams(); // Get URL params
  const [reservation, setReservation] = useState({
    seatCount: "",
    date: "",
    time: "",
    dineTable: { t_id: "", capacity: "" },
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch reservation details on mount
  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/reservations/${id}`);
        if (!res.ok) throw new Error("Failed to fetch reservation");
        const data = await res.json();
        setReservation({
          seatCount: data.seatCount || "",
          date: data.date || "",
          time: data.time || "",
          dineTable: data.dineTable || { t_id: "", capacity: "" },
        });
      } catch (err) {
        console.error("Error fetching reservation:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReservation();
  }, [id]);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedReservation = {
      seatCount: reservation.seatCount,
      date: reservation.date,
      time: reservation.time,
      dineTable: { t_id: tableId },
      user: { id: userId },
    };

    try {
      const res = await fetch(
        `http://localhost:8080/api/reservations/update/${id}/${userId}/${tableId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedReservation),
        }
      );

      if (!res.ok) throw new Error("Update failed");
      alert(`Reservation #${id} updated successfully.`);
      navigate("/customer/home/reservations/view");
    } catch (err) {
      console.error("Error updating reservation:", err);
      alert("Failed to update reservation.");
    }
  };

  // Handle field changes
  const handleChange = (field, value) => {
    setReservation((prev) => ({ ...prev, [field]: value }));
  };

  if (loading) return <p>Loading reservation...</p>;

  return (
    <div className="container mt-4">
      <h3>Update Reservation #{id}</h3>
      <form onSubmit={handleSubmit}>
        {/* Seat Count */}
        <div className="mb-3">
          <label htmlFor="seatCount" className="form-label">
            Seat Count
          </label>
          <input
            type="number"
            id="seatCount"
            className="form-control"
            value={reservation.seatCount}
            onChange={(e) => handleChange("seatCount", e.target.value)}
            required
          />
        </div>

        {/* Date */}
        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Date
          </label>
          <input
            type="date"
            id="date"
            className="form-control"
            value={reservation.date}
            onChange={(e) => handleChange("date", e.target.value)}
            required
          />
        </div>

        {/* Time */}
        <div className="mb-3">
          <label htmlFor="time" className="form-label">
            Time
          </label>
          <input
            type="time"
            id="time"
            className="form-control"
            value={reservation.time}
            onChange={(e) => handleChange("time", e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
    </div>
  );
}

export default UpdateReservationComponent;
