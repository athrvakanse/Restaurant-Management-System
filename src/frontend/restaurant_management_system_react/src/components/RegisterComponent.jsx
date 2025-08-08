// // import React, { useState } from "react";
// // import axios from "axios";
// // import { useNavigate } from "react-router-dom";
// // import backgroundImg from "../assets/rms2.jpeg";

// // function RegisterComponent() {
// //   const navigate = useNavigate();

// //   const [formData, setFormData] = useState({
// //     fname: "",
// //     mname: "",
// //     lname: "",
// //     email: "",
// //     password: "",
// //     phone_no: "",
// //     aadhar_no: "",
// //   });

// //   const [profilePhoto, setProfilePhoto] = useState(null);

// //   const handleChange = (e) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// //   const handleFileChange = (e) => {
// //     setProfilePhoto(e.target.files[0]);
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const formDataToSend = new FormData();
// //       for (let key in formData) {
// //         formDataToSend.append(key, formData[key]);
// //       }
// //       if (profilePhoto) {
// //         formDataToSend.append("profile_photo", profilePhoto);
// //       }

// //       await axios.post("http://localhost:8082/api1/user/save", formDataToSend, {
// //         headers: {
// //           "Content-Type": "multipart/form-data",
// //         },
// //       });

// //       navigate("/");
// //     } catch (error) {
// //       console.error("Registration failed:", error);
// //     }
// //   };

// //   return (
// //     <div
// //       className="d-flex align-items-center justify-content-center vh-100"
// //       style={{
// //         backgroundImage: `url(${backgroundImg})`,
// //         backgroundSize: "cover",
// //         backgroundPosition: "center",
// //       }}
// //     >
// //       <div
// //         className="container"
// //         style={{
// //           maxWidth: "900px",
// //           backgroundColor: "rgba(245, 222, 179, 0.85)",
// //           borderRadius: "12px",
// //           boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
// //           padding: "30px",
// //         }}
// //       >
// //         <h2 className="text-center mb-4 fw-bold">Register</h2>
// //         <form onSubmit={handleSubmit} encType="multipart/form-data">
// //           <div className="row mb-3">
// //             <div className="col">
// //               <input
// //                 type="text"
// //                 className="form-control"
// //                 name="fname"
// //                 placeholder="First Name"
// //                 value={formData.fname}
// //                 onChange={handleChange}
// //                 required
// //               />
// //             </div>
// //             <div className="col">
// //               <input
// //                 type="text"
// //                 className="form-control"
// //                 name="mname"
// //                 placeholder="Middle Name"
// //                 value={formData.mname}
// //                 onChange={handleChange}
// //               />
// //             </div>
// //             <div className="col">
// //               <input
// //                 type="text"
// //                 className="form-control"
// //                 name="lname"
// //                 placeholder="Last Name"
// //                 value={formData.lname}
// //                 onChange={handleChange}
// //                 required
// //               />
// //             </div>
// //           </div>

// //           <div className="mb-3">
// //             <input
// //               type="email"
// //               className="form-control"
// //               name="email"
// //               placeholder="Email"
// //               value={formData.email}
// //               onChange={handleChange}
// //               required
// //             />
// //           </div>

// //           <div className="mb-3">
// //             <input
// //               type="password"
// //               className="form-control"
// //               name="password"
// //               placeholder="Password"
// //               value={formData.password}
// //               onChange={handleChange}
// //               required
// //             />
// //           </div>

// //           <div className="row mb-3">
// //             <div className="col">
// //               <input
// //                 type="text"
// //                 className="form-control"
// //                 name="phone_no"
// //                 placeholder="Phone Number"
// //                 value={formData.phone_no}
// //                 onChange={handleChange}
// //                 required
// //               />
// //             </div>
// //             <div className="col">
// //               <input
// //                 type="text"
// //                 className="form-control"
// //                 name="aadhar_no"
// //                 placeholder="Aadhar Number"
// //                 value={formData.aadhar_no}
// //                 onChange={handleChange}
// //                 required
// //               />
// //             </div>
// //           </div>

// //           {/* File Upload */}
// //           <div className="mb-3">
// //             <input
// //               type="file"
// //               className="form-control"
// //               name="profile_photo"
// //               accept="image/*"
// //               onChange={handleFileChange}
// //             />
// //           </div>

// //           <div className="d-grid">
// //             <button type="submit" className="btn btn-dark">
// //               Register
// //             </button>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // }

// // export default RegisterComponent;

// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// function RegisterComponent() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     fname: '',
//     mname: '',
//     lname: '',
//     email: '',
//     password: '',
//     phone_no: '',
//     aadhar_no: '',
//     profile_photo: '',
//     gender: '',
//     address: '',
//     r_id: { r_id: 2 }
//   });

//   const [errors, setErrors] = useState({});

//   const handleChange = (e) => {
//     const { name, value, type, files } = e.target;

//     if (type === 'file' && files.length > 0) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setFormData((prevData) => ({
//           ...prevData,
//           profile_photo: reader.result,
//         }));
//       };
//       reader.readAsDataURL(files[0]);
//     } else {
//       setFormData((prevData) => ({
//         ...prevData,
//         [name]: value,
//       }));
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.fname.trim()) newErrors.fname = 'First name is required.';
//     if (!formData.lname.trim()) newErrors.lname = 'Last name is required.';
//     if (!formData.email.match(/^\S+@\S+\.\S+$/)) newErrors.email = 'Invalid email format.';
//     if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters.';
//     if (!/^\d{10}$/.test(formData.phone_no)) newErrors.phone_no = 'Phone number must be 10 digits.';
//     if (!/^\d{12}$/.test(formData.aadhar_no)) newErrors.aadhar_no = 'Aadhar number must be 12 digits.';
//     if (!formData.gender) newErrors.gender = 'Please select a gender.';
//     if (!formData.address.trim()) newErrors.address = 'Address is required.';

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       return;
//     }

//     try {
//       const response = await axios.post('http://localhost:8082/api1/user/save', formData, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       alert('🎉 Registration successful!');
//       navigate('/login');
//     } catch (error) {
//       console.error('Registration failed:', error);
//       alert('❌ Something went wrong during registration.');
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2>Register</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="row">
//           <div className="col-md-4 mb-3">
//             <label>First Name</label>
//             <input type="text" className="form-control" name="fname" onChange={handleChange} />
//             {errors.fname && <div className="text-danger">{errors.fname}</div>}
//           </div>
//           <div className="col-md-4 mb-3">
//             <label>Middle Name</label>
//             <input type="text" className="form-control" name="mname" onChange={handleChange} />
//           </div>
//           <div className="col-md-4 mb-3">
//             <label>Last Name</label>
//             <input type="text" className="form-control" name="lname" onChange={handleChange} />
//             {errors.lname && <div className="text-danger">{errors.lname}</div>}
//           </div>
//           <div className="col-md-6 mb-3">
//             <label>Email</label>
//             <input type="email" className="form-control" name="email" onChange={handleChange} />
//             {errors.email && <div className="text-danger">{errors.email}</div>}
//           </div>
//           <div className="col-md-6 mb-3">
//             <label>Password</label>
//             <input type="password" className="form-control" name="password" onChange={handleChange} />
//             {errors.password && <div className="text-danger">{errors.password}</div>}
//           </div>
//           <div className="col-md-6 mb-3">
//             <label>Phone Number</label>
//             <input type="text" className="form-control" name="phone_no" onChange={handleChange} />
//             {errors.phone_no && <div className="text-danger">{errors.phone_no}</div>}
//           </div>
//           <div className="col-md-6 mb-3">
//             <label>Aadhar Number</label>
//             <input type="text" className="form-control" name="aadhar_no" onChange={handleChange} />
//             {errors.aadhar_no && <div className="text-danger">{errors.aadhar_no}</div>}
//           </div>
//           <div className="col-md-6 mb-3">
//             <label>Profile Photo</label>
//             <input type="file" className="form-control" name="profile_photo" onChange={handleChange} />
//           </div>
//           <div className="col-md-6 mb-3">
//             <label>Gender</label>
//             <select className="form-control" name="gender" onChange={handleChange}>
//               <option value="">Select Gender</option>
//               <option value="Female">Female</option>
//               <option value="Male">Male</option>
//               <option value="Other">Other</option>
//             </select>
//             {errors.gender && <div className="text-danger">{errors.gender}</div>}
//           </div>
//           <div className="col-md-12 mb-3">
//             <label>Address</label>
//             <textarea className="form-control" name="address" onChange={handleChange} rows="3"></textarea>
//             {errors.address && <div className="text-danger">{errors.address}</div>}
//           </div>
//         </div>
//         <button type="submit" className="btn btn-primary">Register</button>
//       </form>
//     </div>
//   );
// }

// export default RegisterComponent;
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import backgroundImg from '../assets/rms2.jpeg';

function RegisterComponent() {
  const navigate = useNavigate();

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

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === 'file' && files.length > 0) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          profile_photo: reader.result,
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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fname.trim()) newErrors.fname = 'First name is required.';
    if (!formData.lname.trim()) newErrors.lname = 'Last name is required.';
    if (!formData.email.match(/^\S+@\S+\.\S+$/)) newErrors.email = 'Invalid email format.';
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters.';
    if (!/^\d{10}$/.test(formData.phone_no)) newErrors.phone_no = 'Phone number must be 10 digits.';
    if (!/^\d{12}$/.test(formData.aadhar_no)) newErrors.aadhar_no = 'Aadhar number must be 12 digits.';
    if (!formData.gender) newErrors.gender = 'Please select a gender.';
    if (!formData.address.trim()) newErrors.address = 'Address is required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await axios.post('http://localhost:8082/api1/user/save', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      alert('🎉 Registration successful!');
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error);
      alert('❌ Something went wrong during registration.');
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      <div
        className="container mt-5"
        style={{
          backgroundColor: 'rgba(245, 222, 179, 0.85)', // lightest brown
          borderRadius: '12px',
          padding: '20px',
          boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
          maxWidth: '750px', // increased width
          width: '100%',
        }}
      >
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-4 mb-3">
              <label>First Name</label>
              <input type="text" className="form-control" name="fname" onChange={handleChange} />
              {errors.fname && <div className="text-danger">{errors.fname}</div>}
            </div>
            <div className="col-md-4 mb-3">
              <label>Middle Name</label>
              <input type="text" className="form-control" name="mname" onChange={handleChange} />
            </div>
            <div className="col-md-4 mb-3">
              <label>Last Name</label>
              <input type="text" className="form-control" name="lname" onChange={handleChange} />
              {errors.lname && <div className="text-danger">{errors.lname}</div>}
            </div>
            <div className="col-md-6 mb-3">
              <label>Email</label>
              <input type="email" className="form-control" name="email" onChange={handleChange} />
              {errors.email && <div className="text-danger">{errors.email}</div>}
            </div>
            <div className="col-md-6 mb-3">
              <label>Password</label>
              <input type="password" className="form-control" name="password" onChange={handleChange} />
              {errors.password && <div className="text-danger">{errors.password}</div>}
            </div>
            <div className="col-md-6 mb-3">
              <label>Phone Number</label>
              <input type="text" className="form-control" name="phone_no" onChange={handleChange} />
              {errors.phone_no && <div className="text-danger">{errors.phone_no}</div>}
            </div>
            <div className="col-md-6 mb-3">
              <label>Aadhar Number</label>
              <input type="text" className="form-control" name="aadhar_no" onChange={handleChange} />
              {errors.aadhar_no && <div className="text-danger">{errors.aadhar_no}</div>}
            </div>
            <div className="col-md-6 mb-3">
              <label>Profile Photo</label>
              <input type="file" className="form-control" name="profile_photo" onChange={handleChange} />
            </div>
            <div className="col-md-6 mb-3">
              <label>Gender</label>
              <select className="form-control" name="gender" onChange={handleChange}>
                <option value="">Select Gender</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
              </select>
              {errors.gender && <div className="text-danger">{errors.gender}</div>}
            </div>
            <div className="col-md-12 mb-3">
              <label>Address</label>
              <textarea className="form-control" name="address" onChange={handleChange} rows="3"></textarea>
              {errors.address && <div className="text-danger">{errors.address}</div>}
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterComponent;
