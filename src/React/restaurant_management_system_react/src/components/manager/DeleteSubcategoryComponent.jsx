import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function DeleteSubcategoryComponent() {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const confirmAndDelete = async () => {
      const confirmed = window.confirm('Are you sure you want to delete this subcategory?');
      if (!confirmed) {
        navigate('/manager/dashboard/subcategory/view');
        return;
      }

      try {
        await axios.delete(`http://localhost:8084/subcategories/delete/${id}`);
        alert('Subcategory deleted successfully.');
        navigate('/manager/dashboard/subcategory/view');
      } catch (error) {
        console.error('Error deleting subcategory:', error);
        alert('Error deleting subcategory.');
        navigate('/manager/dashboard/subcategory/view');
      }
    };

    confirmAndDelete();
  }, [id, navigate]);

  return null; // No UI required
}

export default DeleteSubcategoryComponent;
