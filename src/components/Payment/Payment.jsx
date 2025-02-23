import { useFormik } from "formik"
// import style from "./Payment.module.css"
import axios from "axios";
import { useContext, useState } from "react";
import { cartContext } from "../Context/CartContextProvider";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import {Helmet} from "react-helmet";
function Payment() {
   let{cartId}= useContext(cartContext)
  let navigate= useNavigate()
  let [cash,setCash]=useState(false)
  async function handelCashPayment(values)
    {
        console.log(values);
  try {
 let res= await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,values,
        {
            headers:{ token:localStorage.getItem("token") }
        }
    )
    console.log(res);
    navigate("/AllOrders")
  } catch (error) {
    console.log(error);
    toast.error("Your cart is empty")
  }
    }

    async function handleOnlinePayment(values) {
     try {
      let res=await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,values,
        {
          headers:{token:localStorage.getItem("token")},
          params:{url:"http://localhost:5173"}
          // params:{url:window.location.origin}
        }
      )
      console.log(res.data.session.url);
      window.open(res.data.session.url,'_self')
      
     } catch (error) {
      console.log(error);
      
     } 
    }
    function paymentMethod(values)
    { let apiObj={shippingAddress:values}
      if (cash) {
        handelCashPayment(apiObj)
      }
      else
      {
        handleOnlinePayment(apiObj)
      }
    }
  let formikPayment=useFormik({
        initialValues:{
            details:'',
            phone:'',
            city:''
        },
        onSubmit:paymentMethod
    })
    return <>
    <Helmet><title>Payment page</title></Helmet>
    <div className="w-[50%] mx-auto my-20">
    <form onSubmit={formikPayment.handleSubmit} className="  ">
  <div className="relative z-0 w-full mb-5 group">
      <input type="text" 
      name="details"
      value={formikPayment.values.details }
      onChange={formikPayment.handleChange}
      onBlur={formikPayment.handleBlur}
      id="_details" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
      <label htmlFor="_details" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">details </label>
  </div>
  <div className="relative z-0 w-full mb-5 group">
      <input type="tel" 
      name="phone"
      value={formikPayment.values.phone }
      onChange={formikPayment.handleChange}
      onBlur={formikPayment.handleBlur}
      id="_phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
      <label htmlFor="_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">phone </label>
  </div>
  <div className="relative z-0 w-full mb-0 group">
      <input type="text" 
      name="city"
      value={formikPayment.values.city }
      onChange={formikPayment.handleChange}
      onBlur={formikPayment.handleBlur}
      id="_city" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
      <label htmlFor="_city" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">city </label>
  </div>
  <div className="flex justify-around "><button  onClick={()=>setCash(true)} type="submit" className="px-5 py-3 text-base font-medium text-center  cursor-pointer rounded-md border-[1px] p-1 border-green-400 border-solid translate-y-20 group-hover:translate-y-0 hover:bg-green-500 hover:text-white transition-all mb-5">Cash payment</button>
  <button onClick={()=>setCash(false)} type="submit" className="px-5 py-3 text-base font-medium text-center  cursor-pointer rounded-md border-[1px] p-1 border-green-400 border-solid translate-y-20 group-hover:translate-y-0 hover:bg-green-500 hover:text-white transition-all mb-5">Online payment</button></div>
  
  </form>

    </div>

    </>
}

export default Payment
