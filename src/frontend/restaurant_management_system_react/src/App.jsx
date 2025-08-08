// src/App.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate, NavLink, Outlet } from 'react-router-dom';

import LoginComponent from './components/LoginComponent';
import RegisterComponent from './components/RegisterComponent';
import CustomerHome from './components/customer/CustomerHome'; 
import KitchenstaffDashboard from './components/kitchenstaff/KitchenstaffDashboard';
import ManagerDashboard from './components/manager/ManagerDashboard';
import WaiterDashboard from './components/waiter/WaiterDashboard';
import ViewRoleComponent from './components/manager/ViewRoleComponent';
import AddRoleComponent from './components/manager/AddRoleComponent';
import EditRoleComponent from './components/manager/EditRoleComponent';
import ViewCategoryComponent from './components/manager/ViewCategoryComponent';
import EditCategoryComponent from './components/manager/EditCategoryComponent';
import DeleteCategoryComponent from './components/manager/DeleteCategoryComponet';
import AddCategoryComponent from './components/manager/AddCategoryComponent';
import ViewSubcategoryComponent from './components/manager/ViewSubcategoryComponent';
import AddSubcategoryComponent from './components/manager/AddSubcategoryComponent';
import EditSubcategoryComponent from './components/manager/EditSubcategoryComponent';
import DeleteSubcategoryComponent from './components/manager/DeleteSubcategoryComponent';
import ViewDishComponent from './components/manager/ViewDishComponent' ;
import EditDishComponent from './components/manager/EditDishComponent';
import DeleteDishComponent from './components/manager/DeleteDishComponent';
import AddDishComponent from './components/manager/AddDishComponent';


import './App.css';
import Navbar from './components/manager/Navbar';

function App() {

  return (
    // <Router>
    //   <div className="container-fluid p-0">
    //     {/* Navbar */}
        

    //     {/* Routes */}
    //     <div className="container-fluid">
    //       <Routes>
    //         <Route path="/" element={<Navigate to="/login" />} />
    //         <Route path="/login" element={<LoginComponent />} />
    //         <Route path="/register" element={<RegisterComponent />} />
    //         <Route path="/customer/home" element={<CustomerHome />} />
    //         <Route path="/manager/dashboard" element={<ManagerDashboard />} />
    //         <Route path="/waiter/dashboard" element={<WaiterDashboard />} />
    //         <Route path="/kitchen/orders" element={<KitchenstaffDashboard />} />
    //         <Route path="/manager/role/view" element={<ViewRoleComponent />} />
    //         <Route path="/manager/role/add" element={<AddRoleComponent />} />
    //         <Route path="/manager/role/edit/:id" element={<EditRoleComponent />} />
    //          <Route path="/manager/category/view" element={<ViewCategoryComponent />} />
    //          <Route path="/manager/category/edit/:id" element={<EditCategoryComponent />} />
    //         <Route path="/manager/category/delete/:id" element={<DeleteCategoryComponent />} />
    //         <Route path="/manager/category/add" element={<AddCategoryComponent />} />
    //         <Route path="/manager/subcategory/view" element={<ViewSubcategoryComponent />} />
    //         <Route path="/manager/subcategory/add" element={<AddSubcategoryComponent />} />
    //         <Route path="/manager/subcategory/edit/:id" element={<EditSubcategoryComponent />} />
    //         <Route path="/manager/subcategory/delete/:id" element={<DeleteSubcategoryComponent />} />
    //         <Route path="/manager/dish/view" element={<ViewDishComponent />} />
    //         <Route path="/manager/dish/edit/:d_id" element={<EditDishComponent />} />
    //         <Route path="/manager/dish/delete/:d_id" element={<DeleteDishComponent />} />
    //         <Route path="/manager/dish/add" element={<AddDishComponent />} />
    //         <Route path="/manager/subcategory/view/:categoryId" element={<ViewSubcategoryComponent />} />
    //         <Route path="/manager/dishes/view/:s_id" element={<ViewDishComponent />} />
    //         <Route path="*" element={<h2 className="text-center mt-5">404 Page Not Found</h2>} />
    //       </Routes>
    //     </div>
    //   </div>
    // </Router>
    <>
      <Navbar/>
      <Outlet/>
    </>
  );
}

export default App;
