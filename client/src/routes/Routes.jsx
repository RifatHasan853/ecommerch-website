import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";


import Profile from "../pages/user/Profile";
import UserList from "../pages/Dashboard/UserList";
import AdminRoute from "./AdminRoute";

import Login from "../Auth/Login";
import Register from "../Auth/REgister";
import AllProduct from "../pages/AllProduct";
import AddItem from "../pages/Dashboard/AddItem";
import Cart from "../pages/Dashboard/Cart";
import ManageItems from "../pages/Dashboard/ManageItems";
import Home from "../Home/Home";
import ProductDetail from "../pages/ProductDetail";
import Favourite from "../pages/Dashboard/Favourite";
import Payments from "../pages/Payments/Payments";
import PaymentHistory from "../pages/Dashboard/PaymentHistory";
import OrderList from "../pages/Dashboard/OrderLIst";
import PrivateRoute from './PrivateRoute/PrivateRoute';
import AdminHome from "../pages/Dashboard/AdminHome";
import UpdateItems from "../pages/Dashboard/UpdateItem";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path: '/', 
            element: <Home></Home>
          },
       
      
        {
            path: 'login', 
            element: <Login></Login>
          },
          {
            path: 'register', 
            element: <Register></Register>
          },
          {
            path: 'profile', 
            element: <Profile></Profile>
          },
          {
            path: 'allproducts', 
            element: <AllProduct></AllProduct>
          },
          {
            path: '/products/:id',
            element: 
             
            <PrivateRoute>  <ProductDetail /></PrivateRoute>
              
           
          },
          
          {
            path: 'userlist', 
            element:<AdminRoute><UserList></UserList></AdminRoute> 
          },
          {
            path: 'cart', 
            element:<PrivateRoute><Cart></Cart></PrivateRoute>
          },
          {
            path: 'payments',
            element:<PrivateRoute><Payments></Payments></PrivateRoute> 
          },
          {
            path: 'paymentHistory',
            element:<PrivateRoute> <PaymentHistory></PaymentHistory></PrivateRoute>
          },
          {
            path: 'favourites',

            element:<PrivateRoute><Favourite></Favourite></PrivateRoute>
          },
          {
            path: 'manageitem', 
            element:<AdminRoute><ManageItems></ManageItems></AdminRoute> 
          },
          {
            path: 'addproduct', 
            element:<AdminRoute><PrivateRoute><AddItem></AddItem></PrivateRoute></AdminRoute> 
          },
          {
            path: 'orderlist', 
            element: <AdminRoute><PrivateRoute><OrderList></OrderList></PrivateRoute></AdminRoute>
          }
          ,
          {
            path: 'adminhome', 
            element: <AdminHome></AdminHome>
          },
          {
            path: 'updateitem', 
            element:<AdminRoute> <UpdateItems></UpdateItems></AdminRoute>,
            loader: ({params}) => fetch(`http://localhost:5000/products/${params.id}`)
          }
         
         

    
    
]
},
]);