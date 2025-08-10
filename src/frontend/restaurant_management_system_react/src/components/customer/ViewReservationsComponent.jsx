import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function ViewReservationsComponent() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const loggedInUser = useSelector((state) => state.loggedInUser);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = () => {
    fetch(`http://localhost:8080/api/reservations/${loggedInUser.u_id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setReservations(data);
        } else {
          setReservations([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching reservations:", err);
        setReservations([]);
        setLoading(false);
        setMessage("❌ Failed to load reservations.");
      });
  };

  const handleDeleteReservation = (rt_id) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete reservation #${rt_id}?`
    );
    if (!confirmDelete) return;

    fetch(`http://localhost:8080/api/reservations/delete/${rt_id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setMessage(`✅ Reservation #${rt_id} deleted successfully.`);
          fetchReservations();
        } else {
          throw new Error("Delete failed");
        }
      })
      .catch((error) => {
        console.error("Error deleting reservation:", error);
        setMessage("❌ Failed to delete reservation.");
      });
  };

  return (
    <div className="container mt-4">
      <h3>📅 My Reservations</h3>

      {message && <div className="alert alert-info">{message}</div>}

      {loading ? (
        <p>Loading reservations...</p>
      ) : reservations.length === 0 ? (
        <p className="text-muted">🙁 No reservations found.</p>
      ) : (
        <table className="table table-bordered table-striped mt-3">
          <thead className="thead-dark">
            <tr>
              <th>Reservation ID</th>
              <th>Date</th>
              <th>Time</th>
              <th>Guests</th>
              <th>Table ID</th>
              <th>Capacity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((res) => (
              <tr key={res.rt_id}>
                <td>{res.rt_id}</td>
                <td>{res.date}</td>
                <td>{res.time}</td>
                <td>{res.seatCount}</td>
                <td>{res.dineTable?.t_id}</td>
                <td>{res.dineTable?.capacity}</td>
                <td>
                  <Link
                    to={`/customer/home/reservations/update/${res.rt_id}/${res.user?.id}/${res.dineTable?.t_id}`}
                    className="btn btn-warning btn-sm me-2"
                  >
                    ✏️ Update
                  </Link>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeleteReservation(res.rt_id)}
                  >
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ViewReservationsComponent;
