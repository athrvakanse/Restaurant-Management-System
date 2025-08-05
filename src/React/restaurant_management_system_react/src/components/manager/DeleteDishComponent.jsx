import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function DeleteDishComponent() {
  const { d_id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (window.confirm("Are you sure you want to delete this dish?")) {
      deleteDishById(d_id);
    } else {
      navigate('/manager/dashboard/dish/view'); // Cancelled
    }
  }, [d_id, navigate]);

  const deleteDishById = async (id) => {
    try {
      await axios.delete(`http://localhost:8084/dishes/delete/${id}`);
      alert('Dish deleted successfully.');
    } catch (error) {
      console.error('Error deleting dish:', error);
      alert('Failed to delete the dish.');
    } finally {
      navigate('/manager/dashboard/dish/view'); // Go back to dish list
    }
  };

  return null; // no UI needed; handled via useEffect
}

export default DeleteDishComponent;
