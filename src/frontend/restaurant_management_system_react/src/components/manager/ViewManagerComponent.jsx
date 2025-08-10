import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ViewManagerComponent() {
  const [managers, setManagers] = useState([]);
  const [editingManager, setEditingManager] = useState(null);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    fetchManagers();
    fetchRoles();
  }, []);

  const fetchManagers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api3/users/managers');
      setManagers(response.data);
    } catch (error) {
      console.error('Error fetching managers:', error);
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api3/roles/all');
      setRoles(response.data);
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };

  const handleEdit = (manager) => {
    setEditingManager({ ...manager });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "r_id") {
      const selectedRole = roles.find((role) => role.r_id === parseInt(value));
      setEditingManager((prev) => ({
        ...prev,
        r_id: selectedRole || null,
      }));
    } else {
      setEditingManager((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:8080/api3/users/update/${editingManager.u_id}`, editingManager);
      setEditingManager(null);
      fetchManagers();
    } catch (error) {
      console.error("Error updating manager:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this manager?")) {
      try {
        await axios.delete(`http://localhost:8080/api3/users/delete/${id}`);
        fetchManagers();
      } catch (error) {
        console.error("Error deleting manager:", error);
      }
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4">Manager List</h3>

      {editingManager && (
        <div className="card mb-4 p-3">
          <h5>Edit Manager</h5>
          <div className="row">
            <div className="col">
              <input name="fname" value={editingManager.fname} onChange={handleInputChange} placeholder="First Name" className="form-control mb-2" />
              <input name="mname" value={editingManager.mname || ''} onChange={handleInputChange} placeholder="Middle Name" className="form-control mb-2" />
              <input name="lname" value={editingManager.lname} onChange={handleInputChange} placeholder="Last Name" className="form-control mb-2" />
              <input name="email" value={editingManager.email} onChange={handleInputChange} placeholder="Email" className="form-control mb-2" />
              <input name="phone_no" value={editingManager.phone_no} onChange={handleInputChange} placeholder="Phone" className="form-control mb-2" />
              <input name="address" value={editingManager.address} onChange={handleInputChange} placeholder="Address" className="form-control mb-2" />
              <select name="gender" value={editingManager.gender} onChange={handleInputChange} className="form-control mb-2">
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <select name="r_id" value={editingManager.r_id?.r_id || ""} onChange={handleInputChange} className="form-control mb-2">
                <option value="">Select Role</option>
                {roles.map((role) => (
                  <option key={role.r_id} value={role.r_id}>{role.r_name}</option>
                ))}
              </select>
              <button className="btn btn-primary me-2" onClick={handleUpdate}>Update</button>
              <button className="btn btn-secondary" onClick={() => setEditingManager(null)}>Cancel</button>
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
            {managers.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center">No managers found.</td>
              </tr>
            ) : (
              managers.map((manager) => (
                <tr key={manager.u_id}>
                  <td>{manager.u_id}</td>
                  <td>{`${manager.fname} ${manager.mname || ''} ${manager.lname}`}</td>
                  <td>{manager.email}</td>
                  <td>{manager.phone_no}</td>
                  <td>{manager.address}</td>
                  <td>{manager.gender}</td>
                  <td>{manager.r_id?.r_name || 'N/A'}</td>
                  <td>
                    <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(manager)}>Edit</button>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(manager.u_id)}>Delete</button>
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

export default ViewManagerComponent;
