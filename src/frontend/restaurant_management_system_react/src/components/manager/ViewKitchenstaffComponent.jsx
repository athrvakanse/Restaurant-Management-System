import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ViewKitchenstaffComponent() {
  const [kitchenStaff, setKitchenStaff] = useState([]);
  const [editingStaff, setEditingStaff] = useState(null);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    fetchKitchenStaff();
    fetchRoles();
  }, []);

  const fetchKitchenStaff = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api3/users/kitchenstaff');
      setKitchenStaff(response.data);
    } catch (error) {
      console.error('Error fetching kitchen staff:', error);
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

  const handleEdit = (staff) => {
    setEditingStaff({ ...staff });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "r_id") {
      const selectedRole = roles.find((role) => role.r_id === parseInt(value));
      setEditingStaff((prev) => ({
        ...prev,
        r_id: selectedRole || null,
      }));
    } else {
      setEditingStaff((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:8080/api3/users/update/${editingStaff.u_id}`, editingStaff);
      setEditingStaff(null);
      fetchKitchenStaff();
    } catch (error) {
      console.error("Error updating kitchen staff:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this kitchen staff member?")) {
      try {
        await axios.delete(`http://localhost:8080/api3/users/delete/${id}`);
        fetchKitchenStaff();
      } catch (error) {
        console.error("Error deleting kitchen staff:", error);
      }
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4">Kitchen Staff List</h3>

      {editingStaff && (
        <div className="card mb-4 p-3">
          <h5>Edit Kitchen Staff</h5>
          <div className="row">
            <div className="col">
              <input name="fname" value={editingStaff.fname} onChange={handleInputChange} placeholder="First Name" className="form-control mb-2" />
              <input name="mname" value={editingStaff.mname || ''} onChange={handleInputChange} placeholder="Middle Name" className="form-control mb-2" />
              <input name="lname" value={editingStaff.lname} onChange={handleInputChange} placeholder="Last Name" className="form-control mb-2" />
              <input name="email" value={editingStaff.email} onChange={handleInputChange} placeholder="Email" className="form-control mb-2" />
              <input name="phone_no" value={editingStaff.phone_no} onChange={handleInputChange} placeholder="Phone" className="form-control mb-2" />
              <input name="address" value={editingStaff.address} onChange={handleInputChange} placeholder="Address" className="form-control mb-2" />
              <select name="gender" value={editingStaff.gender} onChange={handleInputChange} className="form-control mb-2">
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <select name="r_id" value={editingStaff.r_id?.r_id || ""} onChange={handleInputChange} className="form-control mb-2">
                <option value="">Select Role</option>
                {roles.map((role) => (
                  <option key={role.r_id} value={role.r_id}>{role.r_name}</option>
                ))}
              </select>
              <button className="btn btn-primary me-2" onClick={handleUpdate}>Update</button>
              <button className="btn btn-secondary" onClick={() => setEditingStaff(null)}>Cancel</button>
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
            {kitchenStaff.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center">No kitchen staff found.</td>
              </tr>
            ) : (
              kitchenStaff.map((staff) => (
                <tr key={staff.u_id}>
                  <td>{staff.u_id}</td>
                  <td>{`${staff.fname} ${staff.mname || ''} ${staff.lname}`}</td>
                  <td>{staff.email}</td>
                  <td>{staff.phone_no}</td>
                  <td>{staff.address}</td>
                  <td>{staff.gender}</td>
                  <td>{staff.r_id?.r_name || 'N/A'}</td>
                  <td>
                    <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(staff)}>Edit</button>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(staff.u_id)}>Delete</button>
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

export default ViewKitchenstaffComponent;
