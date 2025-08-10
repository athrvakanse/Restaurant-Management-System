import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ViewRoleComponent() {
  const [roles, setRoles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api3/roles/all');
      setRoles(response.data);
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };

  const handleEdit = (roleId) => {
    navigate(`/manager/dashboard/role/edit/${roleId}`);
  };

  const handleDelete = async (roleId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this role?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8080/api3/roles/delete/${roleId}`);
      fetchRoles(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting role:', error);
    }
  };

  const handleAddNewRole = () => {
    navigate('/manager/dashboard/role/add');
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">All Roles</h2>

      {roles.length === 0 ? (
        <p>No roles available.</p>
      ) : (
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Role Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <tr key={role.r_id}>
                <td>{role.r_id}</td>
                <td>{role.r_name}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => handleEdit(role.r_id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(role.r_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="text-end mt-3">
        <button className="btn btn-success" onClick={handleAddNewRole}>
          + Create New Role
        </button>
      </div>
    </div>
  );
}

export default ViewRoleComponent;
