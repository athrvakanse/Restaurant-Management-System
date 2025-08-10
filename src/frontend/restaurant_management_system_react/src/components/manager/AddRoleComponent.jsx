// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// function AddRoleComponent() {
//   const [roleName, setRoleName] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const role = { r_name: roleName };
//       await axios.post('http://localhost:8080/api3/roles/save', role);
//       navigate('/manager/dashboard/role/view');
//     } catch (error) {
//       console.error('Error adding role:', error);
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <h2 className="mb-4">Add New Role</h2>
//       <form onSubmit={handleSubmit} className="w-50">
//         <div className="mb-3">
//           <label htmlFor="r_name" className="form-label">Role Name</label>
//           <input
//             type="text"
//             className="form-control"
//             id="r_name"
//             value={roleName}
//             onChange={(e) => setRoleName(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit" className="btn btn-primary">Add Role</button>
//       </form>
//     </div>
//   );
// }

// export default AddRoleComponent;


import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddRoleComponent() {
  const [roleName, setRoleName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const role = { r_name: roleName };
      await axios.post('http://localhost:8080/api3/roles/save', role);
      navigate('/manager/dashboard/role/view');
    } catch (error) {
      console.error('Error adding role:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Add New Role</h2>
      <form onSubmit={handleSubmit} className="w-50">
        <div className="mb-3">
          <label htmlFor="r_name" className="form-label">Role Name</label>
          <input
            type="text"
            className="form-control"
            id="r_name"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Role</button>
      </form>
    </div>
  );
}

export default AddRoleComponent;
