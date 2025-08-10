import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ViewCategoryComponent() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api3/categories/all');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleViewSubcategories = (categoryId) => {
    navigate(`/manager/dashboard/subcategory/view/${categoryId}`);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">All Categories</h2>

      {categories.length === 0 ? (
        <p>No categories found.</p>
      ) : (
        <table className="table table-bordered">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Category Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat.c_id}>
                <td>{cat.c_id}</td>
                <td>{cat.c_name}</td>
                <td>
                  <Link to={`/manager/dashboard/category/edit/${cat.c_id}`} className="btn btn-warning btn-sm me-2">
                    Edit
                  </Link>
                  <Link to={`/manager/dashboard/category/delete/${cat.c_id}`} className="btn btn-danger btn-sm me-2">
                    Delete
                  </Link>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => handleViewSubcategories(cat.c_id)}
                  >
                    View Subcategories
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="d-flex justify-content-end mt-3">
        <Link to="/manager/dashboard/category/add" className="btn btn-success">
          + Add New Category
        </Link>
      </div>
    </div>
  );
}

export default ViewCategoryComponent;

