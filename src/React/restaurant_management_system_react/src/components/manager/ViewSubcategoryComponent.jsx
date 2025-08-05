import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ViewSubcategoryComponent() {
  const [subcategories, setSubcategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSubcategories();
  }, []);

  const fetchSubcategories = async () => {
    try {
      const response = await axios.get('http://localhost:8084/subcategories/all');
      setSubcategories(response.data);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };

  const handleViewDishes = (s_id) => {
    navigate(`/manager/dashboard/dishes/view/${s_id}`);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">All Subcategories</h2>

      {subcategories.length === 0 ? (
        <p>No subcategories found.</p>
      ) : (
        <table className="table table-bordered">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Subcategory Name</th>
              <th>Category Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {subcategories.map((subcat) => (
              <tr key={subcat.s_id}>
                <td>{subcat.s_id}</td>
                <td>{subcat.s_name}</td>
                <td>{subcat.c_id?.c_name || 'N/A'}</td>
                <td>
                  <Link
                    to={`/manager/dashboard/subcategory/edit/${subcat.s_id}`}
                    className="btn btn-warning btn-sm me-2"
                  >
                    Edit
                  </Link>
                  <Link
                    to={`/manager/dashboard/subcategory/delete/${subcat.s_id}`}
                    className="btn btn-danger btn-sm me-2"
                  >
                    Delete
                  </Link>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => handleViewDishes(subcat.s_id)}
                  >
                    View Dishes
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="d-flex justify-content-end mt-3">
        <Link to="/manager/dashboard/subcategory/add" className="btn btn-success">
          + Add New Subcategory
        </Link>
      </div>
    </div>
  );
}

export default ViewSubcategoryComponent;
