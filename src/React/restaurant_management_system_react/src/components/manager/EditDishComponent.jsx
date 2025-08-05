import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditDishComponent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    d_name: '',
    rate: '',
    s_id: ''
  });

  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    fetchDishById();
    fetchSubcategories();
  }, []);

  const fetchDishById = async () => {
    try {
      const response = await axios.get(`http://localhost:8084/dishes/getbyid/${id}`);
      const data = response.data;
      setFormData({
        d_name: data.d_name,
        rate: data.rate,
        s_id: data.s_id?.s_id || ''
      });
    } catch (error) {
      console.error('Error fetching dish:', error);
    }
  };

  const fetchSubcategories = async () => {
    try {
      const res = await axios.get('http://localhost:8084/subcategories/all');
      setSubcategories(res.data);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      d_name: formData.d_name,
      rate: parseFloat(formData.rate),
      s_id: { s_id: parseInt(formData.s_id) }
    };

    try {
      await axios.put(`http://localhost:8084/dishes/update/${id}`, payload);
      navigate('/manager/dashboard/dish/view');
    } catch (error) {
      console.error('Error updating dish:', error);
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
          <label htmlFor="rate" className="form-label">Dish Price</label>
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
            <option value="">Select Subcategory</option>
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
