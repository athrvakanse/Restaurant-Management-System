import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; //Added import



function RegisterComponent() {
  const navigate = useNavigate(); //Initialized navigate

  const [formData, setFormData] = useState({
    fname: '',
    mname: '',
    lname: '',
    email: '',
    password: '',
    phone_no: '',
    aadhar_no: '',
    profile_photo: '',
    gender: '',
    address: '',
    r_id: { r_id: 2 }
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === 'file' && files.length > 0) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          profile_photo: reader.result, //base64 string
        }));
      };
      reader.readAsDataURL(files[0]);
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/user/save', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Registration successful:', response.data);
      alert('Registration successful!');
      navigate('/login'); // Redirect to login page
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Something went wrong during registration.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
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
            <input type="text" className="form-control" name="phone_no" onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label>Aadhar Number</label>
            <input type="text" className="form-control" name="aadhar_no" onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label>Profile Photo</label>
            <input type="file" className="form-control" name="profile_photo" onChange={handleChange} />
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


