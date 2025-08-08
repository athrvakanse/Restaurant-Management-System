import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import backgroundImg from "../assets/rms2.jpeg"; // Make sure the image exists at this path

function RegisterComponent() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fname: "",
    mname: "",
    lname: "",
    email: "",
    password: "",
    phone_no: "",
    aadhar_no: "",
    profile_photo: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/users/add", formData);
      navigate("/");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100"
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="container"
        style={{
          maxWidth: "900px",
          backgroundColor: "rgba(245, 222, 179, 0.85)", // light brown with reduced opacity
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
          padding: "30px",
        }}
      >
        <h2 className="text-center mb-4 fw-bold">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col">
              <input
                type="text"
                className="form-control"
                name="fname"
                placeholder="First Name"
                value={formData.fname}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                name="mname"
                placeholder="Middle Name"
                value={formData.mname}
                onChange={handleChange}
              />
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                name="lname"
                placeholder="Last Name"
                value={formData.lname}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="row mb-3">
            <div className="col">
              <input
                type="text"
                className="form-control"
                name="phone_no"
                placeholder="Phone Number"
                value={formData.phone_no}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                name="aadhar_no"
                placeholder="Aadhar Number"
                value={formData.aadhar_no}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              name="profile_photo"
              placeholder="Profile Photo URL"
              value={formData.profile_photo}
              onChange={handleChange}
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-dark">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterComponent;
