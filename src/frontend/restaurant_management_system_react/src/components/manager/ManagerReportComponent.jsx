import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ManagerReportComponent() {
  const [summary, setSummary] = useState({
    totalUsers: 0,
    totalDishes: 0,
    totalCategories: 0,
    totalSubcategories: 0
  });

  useEffect(() => {
    axios.get('http://localhost:8080/api3/dashboard/summary')
      .then(res => setSummary(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Manager Report Dashboard</h2>

      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card bg-success text-white">
            <div className="card-body">
              <h5 className="card-title">Total Users</h5>
              <p className="card-text">{summary.totalUsers}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-primary text-white">
            <div className="card-body">
              <h5 className="card-title">Total Dishes</h5>
              <p className="card-text">{summary.totalDishes}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-warning text-white">
            <div className="card-body">
              <h5 className="card-title">Total Categories</h5>
              <p className="card-text">{summary.totalCategories}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-danger text-white">
            <div className="card-body">
              <h5 className="card-title">Total Subcategories</h5>
              <p className="card-text">{summary.totalSubcategories}</p>
            </div>
          </div>
        </div>
      </div>

      <h4>Top Selling Dishes</h4>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Dish Name</th>
            <th>Orders</th>
            <th>Revenue</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Paneer Tikka</td>
            <td>35</td>
            <td>₹7,000</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Chicken Biryani</td>
            <td>28</td>
            <td>₹6,500</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Veg Manchurian</td>
            <td>20</td>
            <td>₹4,200</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ManagerReportComponent;
