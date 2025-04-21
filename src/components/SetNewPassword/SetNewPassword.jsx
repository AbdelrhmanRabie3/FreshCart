// import { useContext, useState } from "react";
// import style from "./SetNewPassword.module.css"
// import * as YUp from "yup"
// import axios from "axios";
// import { useFormik} from 'formik'
// import { Navigate, useNavigate } from "react-router-dom";
// import { Authcontext } from "../Context/AuthContextProvider";
// import toast from '../../../node_modules/react-hot-toast/src/index';
// function SetNewPassword() {
//     let logInNavigate=useNavigate()
//     let {setToken}= useContext(Authcontext)
//     let [isLoading,setIsLoading]=useState(false);
//     let [alertMessage,setAlertMessage]=useState(null);
//     let validationSchema= YUp.object().shape(
//         {
//             email:YUp.string().required('email is required').email('email is invalid'),
//             newPassword:YUp.string().required('password is required').matches(/^[A-Za-z][1-9]{5,7}$/,'password must start with letter and has min 6 letters and max 8 '),
//         }
//      )
//      async  function handleSetNewPassword(values)
//         {   setIsLoading(true);
//             console.log(values);
//             try {
//                 let res= await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword',values);
//                 console.log(res);
//                setIsLoading(false);
//             //    setToken(res.data.token)
//                toast.success("Password is changed successfully")
//                setTimeout(() => {
//                 logInNavigate("/Login")
//             }, 3000);
//             } catch (error) {
                
//                 console.log(error.response.data.message);
//                 setAlertMessage(error.response.data.message);   
//                 setIsLoading(false);
//                 toast.error("Password is not changed");
//             }
           
//         }
        
//     let formikSetNewPassword =useFormik({
//         initialValues:{
//             email:"",
//             newPassword:"",
//         },
//         validationSchema,
//         onSubmit:handleSetNewPassword,
//     })
    
    
//         return <>
//         <section className="py-22 w-1/2 mx-auto flex items-start justify-center flex-col">
//             <h2 className="[font-size:20px] mb-1.5">Set new password:</h2>
//         <form className="w-full" action="" onSubmit={formikSetNewPassword.handleSubmit}>
     
//        <div>
//                 <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">email:</label>
//                 <input type="text" id="email" className= " bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" 
//                             name="email"
//                             value={formikSetNewPassword.values.email}
//                             onChange={formikSetNewPassword.handleChange}
//                             onBlur={formikSetNewPassword.handleBlur} />
//             </div>
//             {formikSetNewPassword.errors.email && formikSetNewPassword.touched.email? <div className="p-4 mb-4 text-sm w-full text-center mt-2 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
//              <span className="font-medium">{formikSetNewPassword.errors.email}</span> 
//             </div>:null}
//        <div>
//                 <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New password:</label>
//                 <input type="password" id="password" className= " bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" 
//                             name="newPassword"
//                             value={formikSetNewPassword.values.newPassword}
//                             onChange={formikSetNewPassword.handleChange}
//                             onBlur={formikSetNewPassword.handleBlur}
//                 />
//             </div>
//             {formikSetNewPassword.errors.newPassword && formikSetNewPassword.touched.newPassword? <div className="p-4 mb-4 text-sm w-full text-center mt-2 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
//              <span className="font-medium">{formikSetNewPassword.errors.newPassword}</span> 
//             </div>:null}
//             <div className=" flex justify-between items-center"><button disabled={isLoading?true:false} type="submit" className="cursor-pointer mt-4 self-end focus:outline-none text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-500 dark:hover:bg-green-700 dark:focus:ring-green-800">{isLoading?'Loading...':'Update password'} </button>
//             </div>
           
//        </form>
//     {alertMessage? <div className="p-4 mb-4 text-sm w-full text-center mt-2 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
//       <span className="font-medium">{alertMessage}</span> 
//     </div>:null}
//         </section>
       
//         </>
// }

// export default SetNewPassword
import { useContext, useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import { useFormik } from 'formik';
import { useNavigate, Link } from "react-router-dom";
import { Authcontext } from "../Context/AuthContextProvider";
import toast from 'react-hot-toast';
import { Helmet } from "react-helmet";

function SetNewPassword() {
  const navigate = useNavigate();
  const { setToken } = useContext(Authcontext);
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email is required')
      .email('Invalid email format'),
    newPassword: Yup.string()
      .required('Password is required')
      .matches(/^[A-Za-z][A-Za-z0-9]{5,7}$/, 'Password must start with a letter and be 6-8 characters'),
  });

  async function handleSetNewPassword(values) {
    setIsLoading(true);
    try {
      await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', values);
      toast.success("Password changed successfully");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to change password");
    } finally {
      setIsLoading(false);
    }
  }

  const formikSetNewPassword = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: handleSetNewPassword,
  });

  return (
    <>
      <Helmet>
        <title>Set New Password</title>
      </Helmet>
      <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
        <div className="w-full max-w-lg">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6">
            Set New Password
          </h2>
          <form onSubmit={formikSetNewPassword.handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formikSetNewPassword.values.email}
                onChange={formikSetNewPassword.handleChange}
                onBlur={formikSetNewPassword.handleBlur}
                placeholder="Enter your email"
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              />
              {formikSetNewPassword.errors.email && formikSetNewPassword.touched.email && (
                <div className="mt-1 text-sm text-red-700 bg-red-100 rounded-md p-2">
                  {formikSetNewPassword.errors.email}
                </div>
              )}
            </div>

            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={formikSetNewPassword.values.newPassword}
                onChange={formikSetNewPassword.handleChange}
                onBlur={formikSetNewPassword.handleBlur}
                placeholder="Enter new password"
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              />
              {formikSetNewPassword.errors.newPassword && formikSetNewPassword.touched.newPassword && (
                <div className="mt-1 text-sm text-red-700 bg-red-100 rounded-md p-2">
                  {formikSetNewPassword.errors.newPassword}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading || !formikSetNewPassword.isValid || !formikSetNewPassword.dirty}
              className="w-full sm:w-auto px-5 py-2.5 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 disabled:bg-green-400 disabled:cursor-not-allowed transition-all"
            >
              {isLoading ? 'Loading...' : 'Update Password'}
            </button>
          </form>

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

export default SetNewPassword;