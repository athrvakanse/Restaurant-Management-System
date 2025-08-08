import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ViewWaiterComponent() {
  const [waiters, setWaiters] = useState([]);
  const [editingWaiter, setEditingWaiter] = useState(null);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    fetchWaiters();
    fetchRoles();
  }, []);

  const fetchWaiters = async () => {
    try {
      const response = await axios.get('http://localhost:8084/api3/users/waiters');
      setWaiters(response.data);
    } catch (error) {
      console.error('Error fetching waiters:', error);
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await axios.get('http://localhost:8084/api3/roles/all');
      setRoles(response.data);
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };

  const handleEdit = (waiter) => {
    setEditingWaiter({ ...waiter });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "r_id") {
      const selectedRole = roles.find((role) => role.r_id === parseInt(value));
      setEditingWaiter((prev) => ({
        ...prev,
        r_id: selectedRole || null,
      }));
    } else {
      setEditingWaiter((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:8084/api3/users/update/${editingWaiter.u_id}`, editingWaiter);
      setEditingWaiter(null);
      fetchWaiters();
    } catch (error) {
      console.error("Error updating waiter:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this waiter?")) {
      try {
        await axios.delete(`http://localhost:8084/api3/users/delete/${id}`);
        fetchWaiters();
      } catch (error) {
        console.error("Error deleting waiter:", error);
      }
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4">Waiter List</h3>

      {editingWaiter && (
        <div className="card mb-4 p-3">
          <h5>Edit Waiter</h5>
          <div className="row">
            <div className="col">
              <input name="fname" value={editingWaiter.fname} onChange={handleInputChange} placeholder="First Name" className="form-control mb-2" />
              <input name="mname" value={editingWaiter.mname || ''} onChange={handleInputChange} placeholder="Middle Name" className="form-control mb-2" />
              <input name="lname" value={editingWaiter.lname} onChange={handleInputChange} placeholder="Last Name" className="form-control mb-2" />
              <input name="email" value={editingWaiter.email} onChange={handleInputChange} placeholder="Email" className="form-control mb-2" />
              <input name="phone_no" value={editingWaiter.phone_no} onChange={handleInputChange} placeholder="Phone" className="form-control mb-2" />
              <input name="address" value={editingWaiter.address} onChange={handleInputChange} placeholder="Address" className="form-control mb-2" />
              <select name="gender" value={editingWaiter.gender} onChange={handleInputChange} className="form-control mb-2">
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <select name="r_id" value={editingWaiter.r_id?.r_id || ""} onChange={handleInputChange} className="form-control mb-2">
                <option value="">Select Role</option>
                {roles.map((role) => (
                  <option key={role.r_id} value={role.r_id}>{role.r_name}</option>
                ))}
              </select>
              <button className="btn btn-primary me-2" onClick={handleUpdate}>Update</button>
              <button className="btn btn-secondary" onClick={() => setEditingWaiter(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Gender</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {waiters.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center">No waiters found.</td>
              </tr>
            ) : (
              waiters.map((waiter) => (
                <tr key={waiter.u_id}>
                  <td>{waiter.u_id}</td>
                  <td>{`${waiter.fname} ${waiter.mname || ''} ${waiter.lname}`}</td>
                  <td>{waiter.email}</td>
                  <td>{waiter.phone_no}</td>
                  <td>{waiter.address}</td>
                  <td>{waiter.gender}</td>
                  <td>{waiter.r_id?.r_name || 'N/A'}</td>
                  <td>
                    <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(waiter)}>Edit</button>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(waiter.u_id)}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewWaiterComponent;
