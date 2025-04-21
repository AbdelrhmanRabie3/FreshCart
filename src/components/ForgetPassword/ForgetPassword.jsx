// import { useFormik } from "formik"
// import style from "./ForgetPassword.module.css"
// import * as YUp from "yup"
// import axios from "axios"
// import { useState } from "react"
// import toast from 'react-hot-toast';
// import { useNavigate } from "react-router-dom"
// function ForgetPassword() {
//    const [isLoading,setIsLoading]= useState(false)
//    const [verify,setVerify]= useState(false)
//   const newPassNavigate= useNavigate()
//  let emailValidationSchema= YUp.object().shape(
//     {
//         email:YUp.string().required('email is required').email('email is invalid'),
        
//     }
//  )
//  let codeValidationSchema= YUp.object().shape(
//     {
//         resetCode:YUp.string().required('resetCode is required').matches(/^[0-9]{5,7}$/,'resetCode must be numbers only '),
        
//     }
//  )

// async function handleForgetPassword(values) {
//     setIsLoading(true)
//     try {
//         let res=await axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",values)
//         console.log(res.data);
//         toast.success("Reset code sent to your email")
//         setIsLoading(false)
//         setVerify(true)
//     } catch (error) {
//         console.log(error);
//         setIsLoading(false)
//         if (error) {
//             toast.error("There is no user registered with this email address");
//         }
//         setVerify(false)
//     }
//  }

//  async function handleVerify(values) {
//    setIsLoading(true)
//   try {
//     let res=await axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",values)
//     console.log(res.data);
//      toast.success("Success")
//     setIsLoading(false)
//     setTimeout(() => {
//         newPassNavigate("/setNewPassword")
//     }, 3000);
//   } catch (error) {
//      toast.error("Code is incorrect");
//     setIsLoading(false)
//   } 
 
//  }
//     let formikForgetPassword =useFormik({
//         initialValues:{
//             email:"",
//         },
//        validationSchema: emailValidationSchema,
//         onSubmit:handleForgetPassword,
//     })
//     let formikVerify =useFormik({
//         initialValues:{
//             resetCode:"",
//         },
//        validationSchema: codeValidationSchema,
//         onSubmit :handleVerify,
//     })
    
//     return <>
//     <div className="py-16 w-[80%] mx-auto"> <h2 className="mt-5 font-bold text-2xl">Please enter your Email</h2>
    
//     <form className="w-full" action="" onSubmit={formikForgetPassword.handleSubmit}>
//  <div>
//           <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">email:</label>
//           <input type="text" id="email" className= " bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" 
//                       name="email"
//                       value={formikForgetPassword.values.email}
//                       onChange={formikForgetPassword.handleChange}
//                       onBlur={formikForgetPassword.handleBlur} />
//       </div>
//       {formikForgetPassword.errors.email && formikForgetPassword.touched.email? <div className="p-4 mb-4 text-sm w-full text-center mt-2 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
//          <span className="font-medium">{formikForgetPassword.errors.email}</span> 
//         </div>:null}

//         <button disabled={isLoading?true:false} className={`${verify?"hidden" :"block"} cursor-pointer mt-4 self-end focus:outline-none text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-500 dark:hover:bg-green-700 dark:focus:ring-green-800`} type="submit">  {isLoading?'Loading...':'send verification code'} </button>
//       </form>
    

//     {verify?  <>
//         <h2 className="mt-5 font-bold text-2xl">Enter your verification code</h2>
//         <form className="w-full" action="" onSubmit={formikVerify.handleSubmit}>
//  <div>
//           <label htmlFor="code" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">code:</label>
//           <input type="text" id="code" className= " bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" 
//                       name="resetCode"
//                       value={formikVerify.values.resetCode}
//                       onChange={formikVerify.handleChange}
//                       onBlur={formikVerify.handleBlur} />
//       </div>
//       {formikVerify.errors.resetCode && formikVerify.touched.resetCode? <div className="p-4 mb-4 text-sm w-full text-center mt-2 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
//          <span className="font-medium">{formikVerify.errors.resetCode}</span> 
//         </div>:null}

//         <button disabled={isLoading?true:false} className="cursor-pointer mt-4 self-end focus:outline-none text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-500 dark:hover:bg-green-700 dark:focus:ring-green-800" type="submit">  {isLoading?'Loading...':'verify'} </button>
//       </form>
//     </>
    
//   :null}
//     </div>
   
//     </>
// }

// export default ForgetPassword
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import toast from 'react-hot-toast';
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet";

function ForgetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [verify, setVerify] = useState(false);
  const navigate = useNavigate();

  const emailValidationSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email is required')
      .email('Invalid email format'),
  });

  const codeValidationSchema = Yup.object().shape({
    resetCode: Yup.string()
      .required('Reset code is required')
      .matches(/^[0-9]+$/, 'Reset code must be numbers only'),
  });

  async function handleForgetPassword(values) {
    setIsLoading(true);
    try {
      await axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", values);
      toast.success("Reset code sent to your email");
      setVerify(true);
    } catch (error) {
      toast.error(error.response?.data?.message || "No user registered with this email");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleVerify(values) {
    setIsLoading(true);
    try {
      await axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", values);
      toast.success("Code verified successfully");
      navigate("/setNewPassword");
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid reset code");
    } finally {
      setIsLoading(false);
    }
  }

  const formikForgetPassword = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: emailValidationSchema,
    onSubmit: handleForgetPassword,
  });

  const formikVerify = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema: codeValidationSchema,
    onSubmit: handleVerify,
  });

  return (
    <>
      <Helmet>
        <title>Forget Password</title>
      </Helmet>
      <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
        <div className="w-full max-w-lg">
          {!verify ? (
            <>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6">
                Reset Your Password
              </h2>
              <form onSubmit={formikForgetPassword.handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formikForgetPassword.values.email}
                    onChange={formikForgetPassword.handleChange}
                    onBlur={formikForgetPassword.handleBlur}
                    placeholder="Enter your email"
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  />
                  {formikForgetPassword.errors.email && formikForgetPassword.touched.email && (
                    <div className="mt-1 text-sm text-red-700 bg-red-100 rounded-md p-2">
                      {formikForgetPassword.errors.email}
                    </div>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={isLoading || !formikForgetPassword.isValid || !formikForgetPassword.dirty}
                  className="w-full sm:w-auto px-5 py-2.5 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 disabled:bg-green-400 disabled:cursor-not-allowed transition-all"
                >
                  {isLoading ? 'Loading...' : 'Send Verification Code'}
                </button>
              </form>
            </>
          ) : (
            <>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6">
                Enter Verification Code
              </h2>
              <form onSubmit={formikVerify.handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="resetCode" className="block text-sm font-medium text-gray-700">
                    Verification Code
                  </label>
                  <input
                    type="text"
                    id="resetCode"
                    name="resetCode"
                    value={formikVerify.values.resetCode}
                    onChange={formikVerify.handleChange}
                    onBlur={formikVerify.handleBlur}
                    placeholder="Enter the code"
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  />
                  {formikVerify.errors.resetCode && formikVerify.touched.resetCode && (
                    <div className="mt-1 text-sm text-red-700 bg-red-100 rounded-md p-2">
                      {formikVerify.errors.resetCode}
                    </div>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={isLoading || !formikVerify.isValid || !formikVerify.dirty}
                  className="w-full sm:w-auto px-5 py-2.5 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 disabled:bg-green-400 disabled:cursor-not-allowed transition-all"
                >
                  {isLoading ? 'Loading...' : 'Verify'}
                </button>
              </form>
            </>
          )}
          <Link
            to="/login"
            className="mt-4 block text-sm text-green-600 hover:text-green-800 hover:underline text-center"
          >
            Back to Login
          </Link>
        </div>
      </section>
    </>
  );
}

export default ForgetPassword;  