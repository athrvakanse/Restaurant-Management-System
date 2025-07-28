import React, { useState } from 'react';
import axios from 'axios';

function RegisterComponent() {
  const [formData, setFormData] = useState({
    fname: '',
    mname: '',
    lname: '',
    email: '',
    password: '',
    phoneno: '',
    adharno: '',
    profilephoto: null,
    gender: '',
    address: '',
    r_id: ''
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDetails = new FormData();
    for (const key in formData) {
      formDetails.append(key, formData[key]);
    }

    try {
      const response = await axios.post('http://localhost:8080/user/save', formDetails, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Registration successful:', response.data);
      alert('Registration successful!');
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Something went wrong during registration.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="row">
          <div className="col-md-4 mb-3">
            <label>First Name</label>
            <input type="text" className="form-control" name="fname" onChange={handleChange} required />
          </div>
          <div className="col-md-4 mb-3">
            <label>Middle Name</label>
            <input type="text" className="form-control" name="mname" onChange={handleChange} />
          </div>
          <div className="col-md-4 mb-3">
            <label>Last Name</label>
            <input type="text" className="form-control" name="lname" onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label>Email</label>
            <input type="email" className="form-control" name="email" onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label>Password</label>
            <input type="password" className="form-control" name="password" onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label>Phone Number</label>
            <input type="text" className="form-control" name="phoneno" onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label>Aadhar Number</label>
            <input type="text" className="form-control" name="adharno" onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label>Profile Photo</label>
            <input type="file" className="form-control" name="profilephoto" onChange={handleChange} />
          </div>
          <div className="col-md-6 mb-3">
            <label>Gender</label>
            <select className="form-control" name="gender" onChange={handleChange} required>
              <option value="">Select Gender</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="col-md-12 mb-3">
            <label>Address</label>
            <textarea className="form-control" name="address" onChange={handleChange} rows="3" required></textarea>
          </div>
        </div>

        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
  );
}

export default RegisterComponent;


