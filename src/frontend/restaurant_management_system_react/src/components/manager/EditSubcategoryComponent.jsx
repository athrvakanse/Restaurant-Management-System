import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditSubcategoryComponent() {
  const { id } = useParams(); // Get subcategory ID from URL
  const navigate = useNavigate();

  const [subCategory, setSubCategory] = useState({
    s_name: '',
    c_id: ''
  });

  const [categories, setCategories] = useState([]); // For dropdown

  useEffect(() => {
    fetchSubcategoryById();
    fetchAllCategories();
  }, []);

  const fetchSubcategoryById = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api3/subcategories/getbyid/${id}`);
      setSubCategory({
        s_name: response.data.s_name,
        c_id: response.data.c_id.c_id // nested c_id
      });
    } catch (error) {
      console.error('Error fetching subcategory:', error);
    }
  };

  const fetchAllCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api3/categories/all');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleChange = (e) => {
    setSubCategory({ ...subCategory, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      s_name: subCategory.s_name,
      c_id: { c_id: parseInt(subCategory.c_id) }
    };

    try {
      await axios.put(`http://localhost:8080/api3/subcategories/update/${id}`, payload);
      alert('Subcategory updated successfully!');
      navigate('/manager/dashboard/subcategory/view');
    } catch (error) {
      console.error('Error updating subcategory:', error);
      alert('Failed to update subcategory.');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Edit Subcategory</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="s_name" className="form-label">Subcategory Name</label>
          <input
            type="text"
            className="form-control"
            id="s_name"
            name="s_name"
            value={subCategory.s_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="c_id" className="form-label">Category</label>
          <select
            className="form-select"
            id="c_id"
            name="c_id"
            value={subCategory.c_id}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Category --</option>
            {categories.map((category) => (
              <option key={category.c_id} value={category.c_id}>
                {category.c_name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary">Update Subcategory</button>
      </form>
    </div>
  );
}

export default EditSubcategoryComponent;
