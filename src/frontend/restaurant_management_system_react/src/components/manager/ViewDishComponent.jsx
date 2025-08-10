// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// function ViewDishComponent() {
//   const [dishes, setDishes] = useState([]);

//   useEffect(() => {
//     fetchDishes();
//   }, []);

//   const fetchDishes = async () => {
//     try {
//       const response = await axios.get('http://localhost:8080/api3/dishes/all');
//       setDishes(response.data);
//     } catch (error) {
//       console.error('Error fetching dishes:', error);
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <h2 className="mb-4">All Dishes</h2>

//       {dishes.length === 0 ? (
//         <p>No dishes found.</p>
//       ) : (
//         <table className="table table-bordered">
//           <thead className="table-dark">
//             <tr>
//               <th>ID</th>
//               <th>Dish Name</th>
//               <th>Price</th>
//               <th>Subcategory</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {dishes.map((dish) => (
//               <tr key={dish.d_id}>
//                 <td>{dish.d_id}</td>
//                 <td>{dish.d_name}</td>
//                 <td>{dish.rate}</td>
//                 <td>{dish.s_id?.s_name || 'N/A'}</td>
//                 <td>
//                   <Link
//                     to={`/manager/dashboard/dish/edit/${dish.d_id}`}
//                     className="btn btn-warning btn-sm me-2"
//                   >
//                     Edit
//                   </Link>
//                   <Link
//                     to={`/manager/dashboard/dish/delete/${dish.d_id}`}
//                     className="btn btn-danger btn-sm"
//                   >
//                     Delete
//                   </Link>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//       <div className="d-flex justify-content-end mt-3">
//         <Link to="/manager/dashboard/dish/add" className="btn btn-success">
//           + Add New Dish
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default ViewDishComponent;



import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

function ViewDishComponent() {
  const { subcategoryId } = useParams();
  const [dishes, setDishes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDishes();
  }, [subcategoryId]);

  const fetchDishes = () => {
    axios
      .get(`http://localhost:8080/api3/dishes/subcategory/${subcategoryId}`)
      .then((res) => setDishes(res.data))
      .catch((err) => {
        console.error("Error fetching dishes:", err);
        alert("Failed to load dishes.");
      });
  };

  const handleDelete = (dishId) => {
    if (window.confirm("Are you sure you want to delete this dish?")) {
      axios
        .delete(`http://localhost:8080/api3/dishes/delete/${dishId}`)
        .then(() => {
          // Remove deleted dish from state to update UI
          setDishes(dishes.filter((dish) => dish.d_id !== dishId));
          alert("Dish deleted successfully");
        })
        .catch((err) => {
          console.error("Error deleting dish:", err);
          alert("Failed to delete dish.");
        });
    }
  };

  return (
    <div className="container mt-4">
      <h2>Dishes for Subcategory ID: {subcategoryId}</h2>
      {dishes.length === 0 ? (
        <p>No dishes found.</p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Dish ID</th>
              <th>Dish Name</th>
              <th>Price</th>
              <th>Actions</th> {/* New column for buttons */}
            </tr>
          </thead>
          <tbody>
            {dishes.map((dish) => (
              <tr key={dish.d_id}>
                <td>{dish.d_id}</td>
                <td>{dish.d_name}</td>
                <td>{dish.rate}</td>
                <td>
                  {/* Edit button linking to EditDishComponent */}
                  <Link
                    to={`/manager/dashboard/dish/edit/${dish.d_id}`}
                    className="btn btn-primary btn-sm me-2"
                  >
                    Edit
                  </Link>

                  {/* Delete button triggers delete function */}
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(dish.d_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Buttons for Add Dish and Back navigation */}
      <div className="mt-3">
        <Link
          to={`/manager/dashboard/dish/add/${subcategoryId}`}
          className="btn btn-success me-2"
        >
          Add Dish
        </Link>

        <button
          className="btn btn-secondary"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default ViewDishComponent;
