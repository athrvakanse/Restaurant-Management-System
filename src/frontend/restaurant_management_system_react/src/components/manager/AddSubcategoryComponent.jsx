import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddSubcategoryComponent() {
  const [s_name, setSName] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all categories to populate dropdown
    axios.get('http://localhost:8084/api3/categories/all')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newSubcategory = {
      s_name: s_name,
      c_id: {
        c_id: selectedCategoryId
      }
    };

    try {
      await axios.post('http://localhost:8084/api3/subcategories/save', newSubcategory);
      alert('Subcategory added successfully!');
      navigate('/manager/dashboard/subcategory/view');
    } catch (error) {
      console.error('Error adding subcategory:', error);
      alert('Failed to add subcategory.');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Add New Subcategory</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="s_name" className="form-label">Subcategory Name</label>
          <input
            type="text"
            className="form-control"
            id="s_name"
            value={s_name}
            onChange={(e) => setSName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">Select Category</label>
          <select
            className="form-control"
            id="category"
            value={selectedCategoryId}
            onChange={(e) => setSelectedCategoryId(e.target.value)}
            required
          >
            <option value="">-- Select Category --</option>
            {categories.map((cat) => (
              <option key={cat.c_id} value={cat.c_id}>
                {cat.c_name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-success">Add Subcategory</button>
      </form>
    </div>
  );
}

export default AddSubcategoryComponent;
