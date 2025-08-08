import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ViewDishComponent() {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    fetchDishes();
  }, []);

  const fetchDishes = async () => {
    try {
      const response = await axios.get('http://localhost:8084/api3/dishes/all');
      setDishes(response.data);
    } catch (error) {
      console.error('Error fetching dishes:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">All Dishes</h2>

      {dishes.length === 0 ? (
        <p>No dishes found.</p>
      ) : (
        <table className="table table-bordered">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Dish Name</th>
              <th>Price</th>
              <th>Subcategory</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {dishes.map((dish) => (
              <tr key={dish.d_id}>
                <td>{dish.d_id}</td>
                <td>{dish.d_name}</td>
                <td>{dish.rate}</td>
                <td>{dish.s_id?.s_name || 'N/A'}</td>
                <td>
                  <Link
                    to={`/manager/dashboard/dish/edit/${dish.d_id}`}
                    className="btn btn-warning btn-sm me-2"
                  >
                    Edit
                  </Link>
                  <Link
                    to={`/manager/dashboard/dish/delete/${dish.d_id}`}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="d-flex justify-content-end mt-3">
        <Link to="/manager/dashboard/dish/add" className="btn btn-success">
          + Add New Dish
        </Link>
      </div>
    </div>
  );
}

export default ViewDishComponent;
