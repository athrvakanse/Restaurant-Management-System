// import React, { useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';

// function DeleteSubcategoryComponent() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const confirmAndDelete = async () => {
//       const confirmed = window.confirm('Are you sure you want to delete this subcategory?');
//       if (!confirmed) {
//         navigate('/manager/dashboard/subcategory/view');
//         return;
//       }

//       try {
//         await axios.delete(`http://localhost:8080/api3/subcategories/delete/${id}`);
//         alert('Subcategory deleted successfully.');
//         navigate('/manager/dashboard/subcategory/view');
//       } catch (error) {
//         console.error('Error deleting subcategory:', error);
//         alert('Error deleting subcategory.');
//         navigate('/manager/dashboard/subcategory/view');
//       }
//     };

//     confirmAndDelete();
//   }, [id, navigate]);

//   return null; // No UI required
// }

// export default DeleteSubcategoryComponent;

// src/components/manager/DeleteSubcategoryComponent.jsx


// src/components/manager/DeleteSubcategoryComponent.jsx


import React, { useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';

function DeleteSubcategoryComponent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Get categoryId passed via location state
  const categoryId = location.state?.categoryId;

  useEffect(() => {
    const confirmAndDelete = async () => {
      const confirmed = window.confirm('Are you sure you want to delete this subcategory?');
      if (!confirmed) {
        // Cancel - go back to subcategory list for same category
        if (categoryId) {
          navigate(`/manager/dashboard/subcategory/view/${categoryId}`);
        } else {
          navigate(-1); // fallback to previous page
        }
        return;
      }

      try {
        await axios.delete(`http://localhost:8080/api3/subcategories/delete/${id}`);
        alert('Subcategory deleted successfully.');
        // After deletion, go back to subcategory list page of the same category
        if (categoryId) {
          navigate(`/manager/dashboard/subcategory/view/${categoryId}`);
        } else {
          navigate(-1);
        }
      } catch (error) {
        console.error('Error deleting subcategory:', error);
        alert('Error deleting subcategory.');
        if (categoryId) {
          navigate(`/manager/dashboard/subcategory/view/${categoryId}`);
        } else {
          navigate(-1);
        }
      }
    };

    confirmAndDelete();
  }, [id, categoryId, navigate]);

  return null;
}

export default DeleteSubcategoryComponent;
