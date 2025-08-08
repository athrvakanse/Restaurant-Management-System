import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

function CreateReservationComponent() {
    //const user = useSelector((state) => state.loggedInUser); // Access user directly
const user = useSelector((state) => state.loggedInUser);
// console.log("Logged-in user from Redux:", user);

    const [tableId, setTableId] = useState('');
    const [seatCount, setSeatCount] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Prevent access if user is not logged in
    // if (!user || !user.id) {
    //     return (
    //         <div className="container mt-4">
    //             <div className="alert alert-warning">
    //                 Please log in to make a reservation.
    //             </div>
    //         </div>
    //     );
    // }

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate form fields
        if (!tableId || !seatCount || !date || !time) {
            setErrorMessage("Please fill all fields.");
            setSuccessMessage('');
            return;
        }

        const url = `http://localhost:8081/api/reservations/create/${user.u_id}/${tableId}`;
        const requestBody = {
            seatCount: parseInt(seatCount),
            date,
            time
        };

        axios.post(url, requestBody)
            .then((response) => {
                setSuccessMessage("Reservation created successfully!");
                setErrorMessage('');
                // Reset form
                setTableId('');
                setSeatCount('');
                setDate('');
                setTime('');
            })
            .catch((error) => {
                console.error("Error creating reservation:", error);
                setErrorMessage("Failed to create reservation. Please try again.");
                setSuccessMessage('');
            });
    };

    return (
        <div className="container mt-4">
            <h3>Create Reservation</h3>

            {/* Success and error messages */}
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

            {/* Reservation Form */}
            <form onSubmit={handleSubmit}>
                <div className="form-group mt-3">
                    <label>Table ID</label>
                    <input
                        type="number"
                        className="form-control"
                        value={tableId}
                        onChange={(e) => setTableId(e.target.value)}
                        placeholder="Enter Table ID"
                        required
                    />
                </div>

                <div className="form-group mt-3">
                    <label>Seat Count</label>
                    <input
                        type="number"
                        className="form-control"
                        value={seatCount}
                        onChange={(e) => setSeatCount(e.target.value)}
                        placeholder="Enter number of guests"
                        required
                    />
                </div>

                <div className="form-group mt-3">
                    <label>Date</label>
                    <input
                        type="date"
                        className="form-control"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group mt-3">
                    <label>Time</label>
                    <input
                        type="time"
                        className="form-control"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary mt-4">
                    Create Reservation
                </button>
            </form>
        </div>
    );
}

export default CreateReservationComponent;
