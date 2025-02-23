import { createBrowserRouter, RouterProvider } from "react-router-dom"

import Error from "./components/Error/Error";
import Cart from './components/Cart/Cart';
import AuthContextProvider, { Authcontext } from "./components/Context/AuthContextProvider";
import SetNewPassword from './components/SetNewPassword/SetNewPassword';
import Payment from './components/Payment/Payment';
import CartContextProvider, { cartContext } from "./components/Context/CartContextProvider";
import Layout from './components/Layout/Layout';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import ForgetPassword from './components/ForgetPassword/ForgetPassword';
import Products from './components/Products/Products';
import Categories from './components/Categories/Categories';
import Brands from './components/Brands/Brands';
import WishList from './components/WishList/WishList';
import AllOrders from './components/AllOrders/AllOrders';
import ProductDetails from './components/ProductDetails/ProductDetails';
import WishContextProvider, { wishListContext } from "./components/Context/WishContextProvider";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast';
import Home from './components/Home/Home';
let client = new QueryClient();


function App() {

  
  let routes= createBrowserRouter([
    {
      path:"",element:<Layout/>,children:[{
        path:"",element:<ProtectedRoute><Home/></ProtectedRoute>  },
        {path:"Login",element:<Login/>},
        {path:"Register",element:<Register/>},
        {path:"ForgetPassword",element:<ForgetPassword/>},
        {path:"setNewPassword",element:<SetNewPassword/>},
        {path:"Products",element:<ProtectedRoute><Products/></ProtectedRoute>},
        {path:"Categories",element:<ProtectedRoute><Categories/></ProtectedRoute>},
        {path:"Brands",element:<ProtectedRoute><Brands/></ProtectedRoute>},
        {path:"WishList",element:<ProtectedRoute><WishList/></ProtectedRoute>},
        {path:"payment",element:<ProtectedRoute><Payment/></ProtectedRoute>},
        {path:"AllOrders",element:<ProtectedRoute><AllOrders/></ProtectedRoute>},
        {path:"ProductDetails/:id/:category",element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
        {path:"Cart",element:<ProtectedRoute><Cart/></ProtectedRoute>},
        {path:"*",element:<Error/>}
    ],
    }
  ])

  
  return <>
<AuthContextProvider>
  <CartContextProvider>
  <WishContextProvider>
  
  <QueryClientProvider client={client}>
  <Toaster toastOptions={{
    success: {
      style: {
        color: '#12ce61',
       
      },
    },
    error: {
      style: {
        color: '#E7000B',
      
      },
    },
  }}/>
  <RouterProvider router={routes}/>

  </QueryClientProvider> 
  </WishContextProvider>
  </CartContextProvider>
  </AuthContextProvider>

  </>
}

export default App
