import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function DeleteCategoryComponent() {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const confirmAndDelete = async () => {
      const confirmed = window.confirm('Are you sure you want to delete this category?');
      if (!confirmed) {
        navigate('/manager/dashboard/category/view');
        return;
      }

      try {
        await axios.delete(`http://localhost:8080/api3/categories/delete/${id}`);
        alert('Category deleted successfully.');
        navigate('/manager/dashboard/category/view');
      } catch (error) {
        console.error('Error deleting category:', error);
        alert('Error deleting category.');
        navigate('/manager/dashboard/category/view');
      }
    };

    confirmAndDelete();
  }, [id, navigate]);

  return null; // No UI required
}

export default DeleteCategoryComponent;
