import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ViewCustomerComponent() {
  const [customers, setCustomers] = useState([]);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    fetchCustomers();
    fetchRoles();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get("http://localhost:8084/api3/users/customers");
      setCustomers(response.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await axios.get("http://localhost:8084/api3/roles/all");
      setRoles(response.data);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  const handleEditClick = async (u_id) => {
    try {
      const response = await axios.get(`http://localhost:8084/api3/users/getbyid/${u_id}`);
      setEditingCustomer(response.data);
    } catch (error) {
      console.error("Error fetching customer by ID:", error);
    }
  };

  const handleDelete = async (u_id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this customer?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8084/api3/users/delete/${u_id}`);
      alert("Customer deleted successfully.");
      fetchCustomers();
    } catch (error) {
      console.error("Error deleting customer:", error);
      alert("Failed to delete customer.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // For role dropdown
    if (name === "r_id") {
      setEditingCustomer({
        ...editingCustomer,
        r_id: { r_id: parseInt(value) } // Assuming role id is integer
      });
    } else {
      setEditingCustomer({ ...editingCustomer, [name]: value });
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:8084/api3/users/update/${editingCustomer.u_id}`, editingCustomer);
      alert("Customer updated successfully.");
      setEditingCustomer(null);
      fetchCustomers();
    } catch (error) {
      console.error("Error updating customer:", error);
      alert("Failed to update customer.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Customer List</h2>

      {/* Edit Form */}
      {editingCustomer && (
        <div className="card p-3 mb-4">
          <h4>Edit Customer</h4>
          <div className="row">
            <div className="col-md-4">
              <input type="text" name="fname" className="form-control mb-2" value={editingCustomer.fname} onChange={handleInputChange} placeholder="First Name" />
            </div>
            <div className="col-md-4">
              <input type="text" name="mname" className="form-control mb-2" value={editingCustomer.mname} onChange={handleInputChange} placeholder="Middle Name" />
            </div>
            <div className="col-md-4">
              <input type="text" name="lname" className="form-control mb-2" value={editingCustomer.lname} onChange={handleInputChange} placeholder="Last Name" />
            </div>
            <div className="col-md-4">
              <input type="email" name="email" className="form-control mb-2" value={editingCustomer.email} onChange={handleInputChange} placeholder="Email" />
            </div>
            <div className="col-md-4">
              <input type="text" name="phone_no" className="form-control mb-2" value={editingCustomer.phone_no} onChange={handleInputChange} placeholder="Phone No" />
            </div>
            <div className="col-md-4">
              <input type="text" name="address" className="form-control mb-2" value={editingCustomer.address} onChange={handleInputChange} placeholder="Address" />
            </div>
            <div className="col-md-4">
              <select name="gender" className="form-control mb-2" value={editingCustomer.gender} onChange={handleInputChange}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="col-md-4">
              <select name="r_id" className="form-control mb-2" value={editingCustomer.r_id?.r_id || ""} onChange={handleInputChange}>
                <option value="">Select Role</option>
                {roles.map((role) => (
                  <option key={role.r_id} value={role.r_id}>{role.r_name}</option>
                ))}
              </select>
            </div>
          </div>
          <button className="btn btn-success me-2" onClick={handleUpdate}>Update</button>
          <button className="btn btn-secondary" onClick={() => setEditingCustomer(null)}>Cancel</button>
        </div>
      )}

      {/* Table */}
      <table className="table table-bordered table-hover">
        <thead className="thead-dark">
          <tr>
            <th>User ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone No</th>
            <th>Gender</th>
            <th>Address</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.length === 0 ? (
            <tr><td colSpan="8" className="text-center">No customers found.</td></tr>
          ) : (
            customers.map((user) => (
              <tr key={user.u_id}>
                <td>{user.u_id}</td>
                <td>{`${user.fname} ${user.mname || ''} ${user.lname}`}</td>
                <td>{user.email}</td>
                <td>{user.phone_no}</td>
                <td>{user.gender}</td>
                <td>{user.address}</td>
                <td>{user.r_id?.r_name || 'N/A'}</td>
                <td>
                  <button className="btn btn-warning btn-sm me-2" onClick={() => handleEditClick(user.u_id)}>Edit</button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(user.u_id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ViewCustomerComponent;
