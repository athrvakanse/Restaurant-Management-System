import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddDishComponent() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    d_name: '',
    rate: '',
    s_id: '',
  });

  const [subcategories, setSubcategories] = useState([]);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        d_name: formData.d_name,
        rate: formData.rate,
        s_id: {
          s_id: parseInt(formData.s_id),
        },
      };

      await axios.post('http://localhost:8084/dishes/save', payload);
      alert('Dish added successfully');
      navigate('/manager/dashboard/dish/view');
    } catch (error) {
      console.error('Error adding dish:', error);
      alert('Failed to add dish');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Add New Dish</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Dish Name</label>
          <input
            type="text"
            className="form-control"
            name="d_name"
            value={formData.d_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Price</label>
          <input
            type="number"
            className="form-control"
            name="rate"
            value={formData.rate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Subcategory</label>
          <select
            className="form-control"
            name="s_id"
            value={formData.s_id}
            onChange={handleChange}
            required
          >
            <option value="">Select Subcategory</option>
            {subcategories.map((subcat) => (
              <option key={subcat.s_id} value={subcat.s_id}>
                {subcat.s_name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Add Dish
        </button>
      </form>
    </div>
  );
}

export default AddDishComponent;
