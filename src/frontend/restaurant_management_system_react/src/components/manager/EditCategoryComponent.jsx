// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// function EditCategoryComponent() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     c_name: '',
//   });

//   useEffect(() => {
//     fetchCategoryById();
//   }, []);

//   const fetchCategoryById = async () => {
//     try {
//       const response = await axios.get(`http://localhost:8080/api3/categories/getbyid/${id}`);
//       setFormData(response.data);
//     } catch (error) {
//       console.error('Error fetching category:', error);
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put(`http://localhost:8080/api3/categories/update/${id}`, formData);
//       navigate('/manager/dashboard/category/view');
//     } catch (error) {
//       console.error('Error updating category:', error);
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <h2>Edit Category</h2>
//       <form onSubmit={handleSubmit} className="mt-4">
//         <div className="mb-3">
//           <label htmlFor="c_name" className="form-label">Category Name</label>
//           <input
//             type="text"
//             className="form-control"
//             id="c_name"
//             name="c_name"
//             value={formData.c_name}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <button type="submit" className="btn btn-primary">Update Category</button>
//       </form>
//     </div>
//   );
// }

// export default EditCategoryComponent;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

function EditCategoryComponent() {
  const { id } = useParams(); // category id from route
  const navigate = useNavigate();
  const [category, setCategory] = useState({ c_name: "" });

  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api3/categories/getbyid/${id}`);
      if (response.data) {
        setCategory(response.data);
      }
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  };

  const handleChange = (e) => {
    setCategory({ ...category, c_name: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api3/categories/update/${id}`, category);
      navigate("/manager/dashboard/category/view");
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Edit Category</h2>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label className="form-label">Category Name</label>
          <input
            type="text"
            className="form-control"
            value={category.c_name}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary me-2">
          Update
        </button>
        <Link to="/manager/dashboard/category/view" className="btn btn-secondary">
          Cancel
        </Link>
      </form>
    </div>
  );
}

export default EditCategoryComponent;
