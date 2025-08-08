// EditRoleComponent.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditRoleComponent() {
  const { id } = useParams(); // URL param for role ID
  const [role, setRole] = useState(null); // state to hold fetched role
  const navigate = useNavigate();

  useEffect(() => {
    fetchRoleById();
  }, []);

  const fetchRoleById = async () => {
    try {
      const response = await axios.get(`http://localhost:8084/api3/roles/getbyid/${id}`);
      setRole(response.data);
    } catch (error) {
      console.error('Error fetching role by ID:', error);
    }
  };

  const handleChange = (e) => {
    setRole({ ...role, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8084/api3/roles/update/${id}`, role);
      navigate('/manager/dashboard/role/view');
    } catch (error) {
      console.error('Error updating role:', error);
    }
  };

  if (!role) {
    return <div className="container mt-4">Loading role data...</div>;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Update Role</h2>
      <table className="table table-bordered w-50">
        <tbody>
          <tr>
            <th>ID</th>
            <td>{role.r_id}</td>
          </tr>
          <tr>
            <th>Role Name</th>
            <td>
              <input
                type="text"
                name="r_name"
                className="form-control"
                value={role.r_name || ''}
                onChange={handleChange}
                required
              />
            </td>
          </tr>
        </tbody>
      </table>
      <button className="btn btn-success" onClick={handleSubmit}>
        Update Role
      </button>
    </div>
  );
}

export default EditRoleComponent;
