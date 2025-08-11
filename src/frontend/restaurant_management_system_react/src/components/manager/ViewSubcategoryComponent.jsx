// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// function ViewSubcategoryComponent() {
//   const [subcategories, setSubcategories] = useState([]);
//   const navigate = useNavigate();

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

//   const handleViewDishes = (s_id) => {
//     navigate(`/manager/dashboard/dishes/view/${s_id}`);
//   };

//   return (
//     <div className="container mt-4">
//       <h2 className="mb-4">All Subcategories</h2>

//       {subcategories.length === 0 ? (
//         <p>No subcategories found.</p>
//       ) : (
//         <table className="table table-bordered">
//           <thead className="table-dark">
//             <tr>
//               <th>ID</th>
//               <th>Subcategory Name</th>
//               <th>Category Name</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {subcategories.map((subcat) => (
//               <tr key={subcat.s_id}>
//                 <td>{subcat.s_id}</td>
//                 <td>{subcat.s_name}</td>
//                 <td>{subcat.c_id?.c_name || 'N/A'}</td>
//                 <td>
//                   <Link
//                     to={`/manager/dashboard/subcategory/edit/${subcat.s_id}`}
//                     className="btn btn-warning btn-sm me-2"
//                   >
//                     Edit
//                   </Link>
//                   <Link
//                     to={`/manager/dashboard/subcategory/delete/${subcat.s_id}`}
//                     className="btn btn-danger btn-sm me-2"
//                   >
//                     Delete
//                   </Link>
//                   <button
//                     className="btn btn-info btn-sm"
//                     onClick={() => handleViewDishes(subcat.s_id)}
//                   >
//                     View Dishes
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//       <div className="d-flex justify-content-end mt-3">
//         <Link to="/manager/dashboard/subcategory/add" className="btn btn-success">
//           + Add New Subcategory
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default ViewSubcategoryComponent;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams, Link, useNavigate } from "react-router-dom";

// function ViewSubcategoryComponent() {
//   const { categoryId } = useParams();
//   const [subcategories, setSubcategories] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchSubcategories();
//   }, [categoryId]);

//   const fetchSubcategories = () => {
//     axios
//       .get(`http://localhost:8084/api3/subcategories/byCategory/${categoryId}`)
//       .then((res) => setSubcategories(res.data))
//       .catch((err) => console.error("Error fetching subcategories:", err));
//   };

//   const handleDelete = (id) => {
//     axios
//       .delete(`http://localhost:8084/api3/subcategories/delete/${id}`)
//       .then(() => {
//         setSubcategories((prev) => prev.filter((sub) => sub.s_id !== id));
//       })
//       .catch((err) => console.error("Error deleting subcategory:", err));
//   };

//   return (
//     <div className="container mt-4">
//       <h2>Subcategories for Category ID: {categoryId}</h2>

//       {subcategories.length === 0 ? (
//         <p>No subcategories found for this category.</p>
//       ) : (
//         <table className="table table-bordered">
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Subcategory Name</th>
//               <th>Category Name</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {subcategories.map((sub) => (
//               <tr key={sub.s_id}>
//                 <td>{sub.s_id}</td>
//                 <td>{sub.s_name}</td>
//                 <td>{sub.c_id?.c_name}</td>
//                 <td>
//                   {/* Edit */}
//                   <Link
//                     to={`/edit-subcategory/${sub.s_id}`}
//                     className="btn btn-primary btn-sm me-2"
//                   >
//                     Edit
//                   </Link>

//                   {/* Delete */}
//                   <button
//                     className="btn btn-danger btn-sm me-2"
//                     onClick={() => handleDelete(sub.s_id)}
//                   >
//                     Delete
//                   </button>

//                   {/* View Dishes */}
//                   <Link
//                     to={`/view-dishes/${sub.s_id}`}
//                     className="btn btn-info btn-sm"
//                   >
//                     View Dishes
//                   </Link>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//       {/* Add Subcategory */}
//       <Link
//         to={`/add-subcategory/${categoryId}`}
//         className="btn btn-success mt-3"
//       >
//         Add Subcategory
//       </Link>

//       {/* Back */}
//       <button className="btn btn-secondary mt-3 ms-2" onClick={() => navigate(-1)}>
//         Back
//       </button>
//     </div>
//   );
// }

// export default ViewSubcategoryComponent;


// src/components/ViewSubcategoryComponent.jsx



import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";

function ViewSubcategoryComponent() {
  const { categoryId } = useParams();
  const [subcategories, setSubcategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSubcategories();
  }, [categoryId]);

  const fetchSubcategories = () => {
    axios
      .get(`http://localhost:8080/api3/subcategories/byCategory/${categoryId}`)
      .then((res) => setSubcategories(res.data))
      .catch((err) => console.error("Error fetching subcategories:", err));
  };

  return (
    <div className="container mt-4">
      <h2>Subcategories :</h2>

      {subcategories.length === 0 ? (
        <p>No subcategories found for this category.</p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Subcategory Name</th>
              <th>Category Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {subcategories.map((sub) => (
              <tr key={sub.s_id}>
                <td>{sub.s_id}</td>
                <td>{sub.s_name}</td>
                <td>{sub.c_id?.c_name}</td>
                <td>
                  {/* Edit */}
                  <Link
                    to={`/manager/dashboard/edit-subcategory/${sub.s_id}`}
                    className="btn btn-primary btn-sm me-2"
                  >
                    Edit
                  </Link>

                  {/* Delete */}
                  <Link
                    to={`/manager/dashboard/delete-subcategory/${sub.s_id}`}
                    className="btn btn-danger btn-sm me-2"
                  >
                    Delete
                  </Link>

                  {/* View Dishes */}
                  <Link
                    to={`/manager/dashboard/view-dishes/${sub.s_id}`}
                     className="btn btn-info btn-sm"                 
                     >
                    View Dishes
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Add Subcategory */}
      <Link
       to={`/manager/dashboard/add-subcategory/${categoryId}`}
       className="btn btn-success mt-3"
       >
        Add Subcategory
      </Link>

      {/* Back */}
      <button
        className="btn btn-secondary mt-3 ms-2"
        onClick={() => navigate(-1)}
      >
        Back
      </button>
    </div>
  );
}

export default ViewSubcategoryComponent;
