import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddCategoryComponent() {
  const [c_name, setCategoryName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const categoryData = {
        c_name: c_name
      };

      await axios.post('http://localhost:8084/api3/categories/save', categoryData);
      alert('Category added successfully');
      navigate('/manager/dashboard/category/view'); // Redirect back to category list
    } catch (error) {
      console.error('Error adding category:', error);
      alert('Failed to add category');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Add New Category</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="c_name" className="form-label">Category Name</label>
          <input
            type="text"
            className="form-control"
            id="c_name"
            value={c_name}
            onChange={(e) => setCategoryName(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">Add Category</button>
      </form>
    </div>
  );
}

export default AddCategoryComponent;