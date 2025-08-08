import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditDishComponent() {
  const { d_id } = useParams(); // ✅ Correct param name based on your route
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    d_name: '',
    rate: '',
    s_id: ''
  });

  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch subcategories and dish by ID in parallel
        const [subsResponse, dishResponse] = await Promise.all([
          axios.get('http://localhost:8084/api3/subcategories/all'),
          axios.get(`http://localhost:8084/api3/dishes/getbyid/${d_id}`)
        ]);

        // Set subcategories
        setSubcategories(subsResponse.data);

        // Extract dish data
        const dish = dishResponse.data;
        console.log("Fetched dish:", dish);

        // Update form state
        setFormData({
          d_name: dish.d_name || '',
          rate: dish.rate || '',
          s_id: dish.s_id?.s_id || ''
        });

      } catch (error) {
        console.error('Error loading data:', error);
        alert('Failed to load dish or subcategories');
      }
    };

    fetchData();
  }, [d_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedDish = {
      d_name: formData.d_name,
      rate: parseFloat(formData.rate),
      s_id: { s_id: parseInt(formData.s_id) }
    };

    try {
      await axios.put(`http://localhost:8084/api3/dishes/update/${d_id}`, updatedDish);
      alert("Dish updated successfully");
      navigate('/manager/dashboard/dish/view');
    } catch (error) {
      console.error('Error updating dish:', error);
      alert('Failed to update dish');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Edit Dish</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label htmlFor="d_name" className="form-label">Dish Name</label>
          <input
            type="text"
            className="form-control"
            id="d_name"
            name="d_name"
            value={formData.d_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="rate" className="form-label">Dish Rate</label>
          <input
            type="number"
            className="form-control"
            id="rate"
            name="rate"
            value={formData.rate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="s_id" className="form-label">Subcategory</label>
          <select
            className="form-select"
            id="s_id"
            name="s_id"
            value={formData.s_id}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Subcategory --</option>
            {subcategories.map((sub) => (
              <option key={sub.s_id} value={sub.s_id}>
                {sub.s_name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary">Update Dish</button>
      </form>
    </div>
  );
}

export default EditDishComponent;
