import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddSubcategoryComponent() {
  const [c_name, setCName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCategory = { c_name };

    try {
      await axios.post('http://localhost:8084/subcategories/save', newCategory);
      alert('Category added successfully!');
      navigate('/manager/dashboard/category/view');
    } catch (error) {
      console.error('Error adding category:', error);
      alert('Failed to add category.');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Add New Category</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="c_name" className="form-label">Sub Category Name</label>
          <input
            type="text"
            className="form-control"
            id="c_name"
            value={c_name}
            onChange={(e) => setCName(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">Add Sub Category</button>
      </form>
    </div>
  );
}

export default AddSubcategoryComponent;
