// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// function AddDishComponent() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     d_name: '',
//     rate: '',
//     s_id: '',
//   });

//   const [subcategories, setSubcategories] = useState([]);

//   useEffect(() => {
//     fetchSubcategories();
//   }, []);

//   const fetchSubcategories = async () => {
//     try {
//       const response = await axios.get('http://localhost:8080/api3/subcategories/all');
//       setSubcategories(response.data);
//     } catch (error) {
//       console.error('Error fetching subcategories:', error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const payload = {
//         d_name: formData.d_name,
//         rate: formData.rate,
//         s_id: {
//           s_id: parseInt(formData.s_id),
//         },
//       };

//       await axios.post('http://localhost:8084/api3/dishes/save', payload);
//       alert('Dish added successfully');
//       navigate('/manager/dashboard/dish/view');
//     } catch (error) {
//       console.error('Error adding dish:', error);
//       alert('Failed to add dish');
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <h2 className="mb-4">Add New Dish</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label>Dish Name</label>
//           <input
//             type="text"
//             className="form-control"
//             name="d_name"
//             value={formData.d_name}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div className="mb-3">
//           <label>Price</label>
//           <input
//             type="number"
//             className="form-control"
//             name="rate"
//             value={formData.rate}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div className="mb-3">
//           <label>Subcategory</label>
//           <select
//             className="form-control"
//             name="s_id"
//             value={formData.s_id}
//             onChange={handleChange}
//             required
//           >
//             <option value="">Select Subcategory</option>
//             {subcategories.map((subcat) => (
//               <option key={subcat.s_id} value={subcat.s_id}>
//                 {subcat.s_name}
//               </option>
//             ))}
//           </select>
//         </div>

//         <button type="submit" className="btn btn-primary">
//           Add Dish
//         </button>
//       </form>
//     </div>
//   );
// }

// export default AddDishComponent;


import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function AddDishComponent() {
  const { subcategoryId } = useParams(); // This corresponds to Subcategory ID (s_id)
  const navigate = useNavigate();

  const [dish, setDish] = useState({
    d_name: "",
    rate: "",  // rate instead of d_price
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDish((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      d_name: dish.d_name,
      rate: parseFloat(dish.rate),
      s_id: { s_id: parseInt(subcategoryId) },  // Note: s_id is an object with s_id inside
      u_id: null, // or omit if not required
    };

    axios
      .post("http://localhost:8080/api3/dishes/save", payload)
      .then(() => {
        alert("Dish added successfully!");
        navigate(-1);
      })
      .catch((err) => {
        console.error("Failed to add dish:", err.response?.data || err.message);
        alert("Failed to add dish.");
      });
  };

  return (
    <div className="container mt-4">
      <h2>Add New Dish</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="d_name" className="form-label">
            Dish Name
          </label>
          <input
            type="text"
            id="d_name"
            name="d_name"
            className="form-control"
            value={dish.d_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="rate" className="form-label">
            Price
          </label>
          <input
            type="number"
            id="rate"
            name="rate"
            className="form-control"
            value={dish.rate}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
          />
        </div>

        <button type="submit" className="btn btn-success me-2">
          Add Dish
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate(-1)}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default AddDishComponent;
