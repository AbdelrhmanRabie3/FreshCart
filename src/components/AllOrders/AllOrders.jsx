import axios from "axios"
import style from "./AllOrders.module.css"
import { useContext, useEffect, useState} from "react";
import { cartContext } from "../Context/CartContextProvider";
import { Helmet } from "react-helmet";
import { jwtDecode } from "jwt-decode";
import { useQuery } from "@tanstack/react-query";
import ClipLoader from "react-spinners/esm/ClipLoader";
function AllOrders() {
    const {id} = jwtDecode(localStorage.getItem("token"));
    async function getUserOrders() {
      let res=  await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
        return res
    }
    let {data,error,isError,isLoading}= useQuery({
        queryKey:["userOrders"],
        queryFn:getUserOrders ,
        refetchInterval:60000,
       })
       if (isLoading) {
        return <div className="h-dvh flex justify-center items-center"><ClipLoader color="#12ce61" /></div>
       }
    return <>
    <Helmet><title>AllOrders page</title></Helmet>
<div className="py-16 px-5 w-[80%] mx-auto">
{data.data?.map((order)=><div key={order._id} className="p-6 mb-3 bg-slate-100">
    <h2 className="font-medium ">Total order price: <span className="text-green-400">{order.totalOrderPrice} EGB</span></h2>
    <h2 className=" ">Order payment method: <span className="font-medium">{order.paymentMethodType} </span></h2>
<div className="flex justify-center items-center flex-wrap">
{order.cartItems.map((item)=> <div key={item._id} className="w-1/6 p-2">
        <img className="w-full" src={item.product.imageCover} alt="" />
    </div>)}
</div>
  <div className="flex justify-between items-center">
  <h4 className="text-red-400">{order.isDelivered ==false?"Not delivered yet":<span className="text-blue-400">Delivered</span>  }</h4>
  <h4>{order.isPaid== false? <span className="text-red-400">Cash on delivery</span> : <span className="text-blue-400">Payment done <i className="fa-solid fa-check"></i></span>}</h4>
  </div>
    
</div>)}

</div>
    </>
}

export default AllOrders
