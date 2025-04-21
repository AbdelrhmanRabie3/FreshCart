// import { useFormik } from "formik"
// // import style from "./Payment.module.css"
// import axios from "axios";
// import { useContext, useState } from "react";
// import { cartContext } from "../Context/CartContextProvider";
// import toast from 'react-hot-toast';
// import { useNavigate } from 'react-router-dom';
// import {Helmet} from "react-helmet";
// function Payment() {
//    let{cartId}= useContext(cartContext)
//   let navigate= useNavigate()
//   let [cash,setCash]=useState(false)
//   async function handelCashPayment(values)
//     {
//         console.log(values);
//   try {
//  let res= await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,values,
//         {
//             headers:{ token:localStorage.getItem("token") }
//         }
//     )
//     console.log(res);
//     navigate("/AllOrders")
//   } catch (error) {
//     console.log(error);
//     toast.error("Your cart is empty")
//   }
//     }

//     async function handleOnlinePayment(values) {
//      try {
//       let res=await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,values,
//         {
//           headers:{token:localStorage.getItem("token")},
//           params:{url:"http://localhost:5173"}
//           // params:{url:window.location.origin}
//         }
//       )
//       console.log(res.data.session.url);
//       window.open(res.data.session.url,'_self')
      
//      } catch (error) {
//       console.log(error);
      
//      } 
//     }
//     function paymentMethod(values)
//     { let apiObj={shippingAddress:values}
//       if (cash) {
//         handelCashPayment(apiObj)
//       }
//       else
//       {
//         handleOnlinePayment(apiObj)
//       }
//     }
//   let formikPayment=useFormik({
//         initialValues:{
//             details:'',
//             phone:'',
//             city:''
//         },
//         onSubmit:paymentMethod
//     })
//     return <>
//     <Helmet><title>Payment page</title></Helmet>
//     <div className="w-[50%] mx-auto my-20">
//     <form onSubmit={formikPayment.handleSubmit} className="  ">
//   <div className="relative z-0 w-full mb-5 group">
//       <input type="text" 
//       name="details"
//       value={formikPayment.values.details }
//       onChange={formikPayment.handleChange}
//       onBlur={formikPayment.handleBlur}
//       id="_details" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
//       <label htmlFor="_details" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">details </label>
//   </div>
//   <div className="relative z-0 w-full mb-5 group">
//       <input type="tel" 
//       name="phone"
//       value={formikPayment.values.phone }
//       onChange={formikPayment.handleChange}
//       onBlur={formikPayment.handleBlur}
//       id="_phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
//       <label htmlFor="_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">phone </label>
//   </div>
//   <div className="relative z-0 w-full mb-0 group">
//       <input type="text" 
//       name="city"
//       value={formikPayment.values.city }
//       onChange={formikPayment.handleChange}
//       onBlur={formikPayment.handleBlur}
//       id="_city" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
//       <label htmlFor="_city" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">city </label>
//   </div>
//   <div className="flex justify-around "><button  onClick={()=>setCash(true)} type="submit" className="px-5 py-3 text-base font-medium text-center  cursor-pointer rounded-md border-[1px] p-1 border-green-400 border-solid translate-y-20 group-hover:translate-y-0 hover:bg-green-500 hover:text-white transition-all mb-5">Cash payment</button>
//   <button onClick={()=>setCash(false)} type="submit" className="px-5 py-3 text-base font-medium text-center  cursor-pointer rounded-md border-[1px] p-1 border-green-400 border-solid translate-y-20 group-hover:translate-y-0 hover:bg-green-500 hover:text-white transition-all mb-5">Online payment</button></div>
  
//   </form>

//     </div>

//     </>
// }

// export default Payment
import { useFormik } from "formik";
import axios from "axios";
import { useContext, useState } from "react";
import { cartContext } from "../Context/CartContextProvider";
import toast from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
import * as Yup from "yup";

function Payment() {
  const { cartId } = useContext(cartContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isCash, setIsCash] = useState(null);

  const validationSchema = Yup.object().shape({
    details: Yup.string().required("Details are required").min(3, "Details must be at least 3 characters"),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^(01[0125][0-9]{8})$/, "Phone number must be a valid Egyptian number"),
    city: Yup.string().required("City is required").min(2, "City must be at least 2 characters"),
  });

  async function handleCashPayment(values) {
    setIsLoading(true);
    try {
      const res = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        { shippingAddress: values },
        { headers: { token: localStorage.getItem("token") } }
      );
      toast.success("Order placed successfully");
      navigate("/AllOrders");
    } catch (error) {
      toast.error(error.response?.data?.message || "Your cart is empty");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleOnlinePayment(values) {
    setIsLoading(true);
    try {
      const res = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
        { shippingAddress: values },
        {
          headers: { token: localStorage.getItem("token") },
          params: { url: window.location.origin },
        }
      );
      window.location.href = res.data.session.url;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to initiate online payment");
    } finally {
      setIsLoading(false);
    }
  }

  const formikPayment = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    validationSchema,
    onSubmit: (values) => {
      if (isCash === null) {
        toast.error("Please select a payment method");
        return;
      }
      if (isCash) {
        handleCashPayment(values);
      } else {
        handleOnlinePayment(values);
      }
    },
  });

  return (
    <>
      <Helmet>
        <title>Payment</title>
      </Helmet>
      <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
        <div className="w-full max-w-lg">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6">
            Payment
          </h2>
          <form onSubmit={formikPayment.handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="details" className="block text-sm font-medium text-gray-700">
                Details
              </label>
              <input
                type="text"
                id="details"
                name="details"
                value={formikPayment.values.details}
                onChange={formikPayment.handleChange}
                onBlur={formikPayment.handleBlur}
                placeholder="Enter shipping details"
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              />
              {formikPayment.errors.details && formikPayment.touched.details && (
                <div className="mt-1 text-sm text-red-700 bg-red-100 rounded-md p-2">
                  {formikPayment.errors.details}
                </div>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formikPayment.values.phone}
                onChange={formikPayment.handleChange}
                onBlur={formikPayment.handleBlur}
                placeholder="Enter your phone number"
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              />
              {formikPayment.errors.phone && formikPayment.touched.phone && (
                <div className="mt-1 text-sm text-red-700 bg-red-100 rounded-md p-2">
                  {formikPayment.errors.phone}
                </div>
              )}
            </div>

            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formikPayment.values.city}
                onChange={formikPayment.handleChange}
                onBlur={formikPayment.handleBlur}
                placeholder="Enter your city"
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              />
              {formikPayment.errors.city && formikPayment.touched.city && (
                <div className="mt-1 text-sm text-red-700 bg-red-100 rounded-md p-2">
                  {formikPayment.errors.city}
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <button
                type="button"
                onClick={() => setIsCash(true)}
                disabled={isLoading}
                className="w-full sm:w-auto px-5 py-2.5 text-sm font-medium text-green-600 border border-green-600 rounded-md hover:bg-green-600 hover:text-white focus:outline-none focus:ring-4 focus:ring-green-300 disabled:bg-green-400 disabled:text-white disabled:cursor-not-allowed transition-all"
              >
                {isLoading && isCash === true ? (
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                ) : null}
                Cash Payment
              </button>
              <button
                type="button"
                onClick={() => setIsCash(false)}
                disabled={isLoading}
                className="w-full sm:w-auto px-5 py-2.5 text-sm font-medium text-green-600 border border-green-600 rounded-md hover:bg-green-600 hover:text-white focus:outline-none focus:ring-4 focus:ring-green-300 disabled:bg-green-400 disabled:text-white disabled:cursor-not-allowed transition-all"
              >
                {isLoading && isCash === false ? (
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                ) : null}
                Online Payment
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading || !formikPayment.isValid || !formikPayment.dirty}
              className="w-full mt-4 px-5 py-2.5 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 disabled:bg-green-400 disabled:cursor-not-allowed transition-all"
            >
              {isLoading ? (
                <i className="fas fa-spinner fa-spin mr-2"></i>
              ) : null}
              Submit Payment
            </button>
          </form>

          <Link
            to="/cart"
            className="mt-4 block text-sm text-green-600 hover:text-green-800 hover:underline text-center"
          >
            Back to Cart
          </Link>
        </div>
      </section>
    </>
  );
}

export default Payment;