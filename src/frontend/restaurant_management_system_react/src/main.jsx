// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import rmsStore from './store/rmsStore';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginComponent from './components/LoginComponent.jsx';
import RegisterComponent from './components/RegisterComponent.jsx';
import CustomerHome from './components/customer/CustomerHome.jsx';
import WaiterDashboard from './components/waiter/WaiterDashboard.jsx';
import ManagerDashboard from './components/manager/ManagerDashboard.jsx';
import ViewRoleComponent from './components/manager/ViewRoleComponent.jsx';
import AddRoleComponent from './components/manager/AddRoleComponent.jsx';
import EditRoleComponent from './components/manager/EditRoleComponent.jsx';
import ViewCategoryComponent from './components/manager/ViewCategoryComponent.jsx';
import AddCategoryComponent from './components/manager/AddCategoryComponent.jsx';
import EditCategoryComponent from './components/manager/EditCategoryComponent.jsx';
import DeleteCategoryComponent from './components/manager/DeleteCategoryComponet.jsx';
import ViewSubcategoryComponent from './components/manager/ViewSubcategoryComponent.jsx';
import EditSubcategoryComponent from './components/manager/EditSubcategoryComponent.jsx';
import DeleteSubcategoryComponent from './components/manager/DeleteSubcategoryComponent.jsx';
import ViewDishComponent from './components/manager/ViewDishComponent.jsx';
import AddDishComponent from './components/manager/AddDishComponent.jsx';
import EditDishComponent from './components/manager/EditDishComponent.jsx';
import DeleteDishComponent from './components/manager/DeleteDishComponent.jsx';
import KitchenstaffDashboard from './components/kitchenstaff/KitchenstaffDashboard.jsx';
import AddSubcategoryComponent from './components/manager/AddSubcategoryComponent.jsx';
import ViewCustmerComponent from './components/manager/ViewCustomerComponent.jsx';
import ViewWaiterComponent from './components/manager/ViewWaiterComponent.jsx';
import ViewKitchenstaffComponent from'./components/manager/ViewKitchenstaffComponent.jsx';
import ViewManagerComponent from './components/manager/ViewManagerComponent.jsx'
import ManagerReportComponent from './components/manager/ManagerReportComponent.jsx';
import WhatToCookComponent from './components/kitchenstaff/WhatToCookComponent.jsx';
import TrackOrderProgressComponent from './components/kitchenstaff/TrackOrderProgressComponent.jsx';
import UpdateOrderStatusComponent from './components/kitchenstaff/UpdateOrderStatusComponent.jsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <LoginComponent /> },
      {path: "/login", element: <LoginComponent />},

      { path: '/register', element: <RegisterComponent /> },
      { path: '/customer/home', element: <CustomerHome /> },
      { path: '/waiter/dashboard', element: <WaiterDashboard /> },
      { path: '/kitchen/orders', element: <KitchenstaffDashboard /> },
      {
        path: '/manager/dashboard',
        element: <ManagerDashboard />,
        children: [
          { index: true, element: <ManagerReportComponent /> }, 
          { path: 'report', element: <ManagerReportComponent /> },
          { path: 'role/view', element: <ViewRoleComponent /> },
          { path: 'role/add', element: <AddRoleComponent /> },
          { path: 'role/edit/:id', element: <EditRoleComponent /> },

          { path: 'category/view', element: <ViewCategoryComponent /> },
          { path: 'category/add', element: <AddCategoryComponent /> },
          { path: 'category/edit/:id', element: <EditCategoryComponent /> },
          { path: 'category/delete/:id', element: <DeleteCategoryComponent /> },

          { path: 'subcategory/view', element: <ViewSubcategoryComponent /> },
          { path: 'subcategory/add', element: <AddSubcategoryComponent /> },
          { path: 'subcategory/edit/:id', element: <EditSubcategoryComponent /> },
          { path: 'subcategory/delete/:id', element: <DeleteSubcategoryComponent /> },
          { path: 'subcategory/view/:categoryId', element: <ViewSubcategoryComponent /> },

          { path: 'dish/view', element: <ViewDishComponent /> },
          { path: 'dish/add', element: <AddDishComponent /> },
          { path: 'dish/edit/:d_id', element: <EditDishComponent /> },
          { path: 'dish/delete/:d_id', element: <DeleteDishComponent /> },
          { path: 'dishes/view/:s_id', element: <ViewDishComponent /> },

           { path: 'users/managers', element: <ViewManagerComponent /> },
          { path: 'users/customers', element: <ViewCustmerComponent /> },
          { path: 'users/waiters', element: <ViewWaiterComponent /> },
          { path: 'users/Kitchenstaff', element: <ViewKitchenstaffComponent /> }
         


        ],
      }, {
        path: "/kitchenstaff/dashboard",
        element: <KitchenstaffDashboard />,
        children: [
            { path: 'what-to-cook', element: <WhatToCookComponent /> },
            { path: 'track-progress', element: <TrackOrderProgressComponent /> },
            {path: 'update-status', element: <UpdateOrderStatusComponent /> } 
        ]
      },
      {
        path: '*',
        element: <h2 className="text-center mt-5">404 Page Not Found</h2>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={rmsStore}>
    <RouterProvider router={router} />
  </Provider>
);


