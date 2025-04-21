// import style from "./Login.module.css"
// import { useFormik} from 'formik'
// import axios from "axios"
// import { useContext, useState } from "react";
// import {useNavigate} from "react-router-dom"
// import * as YUp from "yup"
// import { Authcontext } from '../Context/AuthContextProvider';
// import { cartContext } from "../Context/CartContextProvider";
// function Login() {
    
// let [alertMessage,setAlertMessage]=useState(null);
// let [isLoading,setIsLoading]=useState(false);
// let navigate =useNavigate()
// let {setToken}= useContext(Authcontext)
// let {getCart}= useContext(cartContext)
// let forgetPassNavigate= useNavigate()
//  let validationSchema= YUp.object().shape(
//     {
//         email:YUp.string().required('email is required').email('email is invalid'),
//         password:YUp.string().required('password is required').matches(/^[A-Za-z][1-9]{5,7}$/,'password must start with letter and has min 6 letters and max 8 '),
//     }
//  )
//  async  function handleLogin(values)
//     {   setIsLoading(true);
//         console.log(values);
//         try {
//             let res= await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',values);
//             console.log(res);
//             localStorage.setItem('token',res.data.token);
//             setToken(res.data.token)
//             getCart()
//             navigate('/');
            
//            setIsLoading(false);
//         } catch (error) {
            
//             console.log(error.response.data.message);
//             setAlertMessage(error.response.data.message);   
//             setIsLoading(false);
//         }
       
//     }
    
// let formikLogin =useFormik({
//     initialValues:{
//         email:"",
//         password:"",
//     },
//     validationSchema,
//     onSubmit:handleLogin,
// })


//     return <>
//     <section className="py-22 w-1/2 mx-auto flex items-start justify-center flex-col">
//         <h2 className="[font-size:20px] mb-1.5">Login Now:</h2>
//     <form className="w-full" action="" onSubmit={formikLogin.handleSubmit}>
 
//    <div>
//             <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">email:</label>
//             <input type="text" id="email" className= " bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" 
//                         name="email"
//                         value={formikLogin.values.email}
//                         onChange={formikLogin.handleChange}
//                         onBlur={formikLogin.handleBlur} />
//         </div>
//         {formikLogin.errors.email && formikLogin.touched.email? <div className="p-4 mb-4 text-sm w-full text-center mt-2 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
//          <span className="font-medium">{formikLogin.errors.email}</span> 
//         </div>:null}
//    <div>
//             <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">password:</label>
//             <input type="password" id="password" className= " bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" 
//                         name="password"
//                         value={formikLogin.values.password}
//                         onChange={formikLogin.handleChange}
//                         onBlur={formikLogin.handleBlur}
//             />
//         </div>
//         {formikLogin.errors.password && formikLogin.touched.password? <div className="p-4 mb-4 text-sm w-full text-center mt-2 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
//          <span className="font-medium">{formikLogin.errors.password}</span> 
//         </div>:null}
//         <div className=" flex justify-between items-center"><button disabled={isLoading?true:false} type="submit" className="cursor-pointer mt-4 self-end focus:outline-none text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-500 dark:hover:bg-green-700 dark:focus:ring-green-800">{isLoading?'Loading...':'Login'} </button>
        
//         <span onClick={()=> forgetPassNavigate("/ForgetPassword")} className="cursor-pointer font-medium text-green-600 dark:text-red-500 hover:underline">Forget password?</span></div>
       
//    </form>
// {alertMessage? <div className="p-4 mb-4 text-sm w-full text-center mt-2 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
//   <span className="font-medium">{alertMessage}</span> 
// </div>:null}
//     </section>
   
//     </>
// }

// export default Login
import { useFormik } from 'formik';
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Authcontext } from '../Context/AuthContextProvider';
import { cartContext } from "../Context/CartContextProvider";
import { Helmet } from "react-helmet";

function Login() {
  let [alertMessage, setAlertMessage] = useState(null);
  let [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();
  let { setToken } = useContext(Authcontext);
  let { getCart } = useContext(cartContext);

  let validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email is required')
      .email('Invalid email format'),
    password: Yup.string()
      .required('Password is required')
      .matches(/^[A-Za-z][A-Za-z0-9]{5,7}$/, 'Password must start with a letter and be 6-8 characters'),
  });

  async function handleLogin(values) {
    setIsLoading(true);
    try {
      let res = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values);
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      await getCart();
      navigate('/');
      setIsLoading(false);
    } catch (error) {
      setAlertMessage(error.response?.data?.message || 'Login failed');
      setIsLoading(false);
    }
  }

  let formikLogin = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleLogin,
  });

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
        <div className="w-full max-w-lg">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6">
            Login Now
          </h2>
          <form onSubmit={formikLogin.handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formikLogin.values.email}
                onChange={formikLogin.handleChange}
                onBlur={formikLogin.handleBlur}
                placeholder="Enter your email"
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              />
              {formikLogin.errors.email && formikLogin.touched.email && (
                <div className="mt-1 text-sm text-red-700 bg-red-100 rounded-md p-2">
                  {formikLogin.errors.email}
                </div>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formikLogin.values.password}
                onChange={formikLogin.handleChange}
                onBlur={formikLogin.handleBlur}
                placeholder="Enter your password"
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              />
              {formikLogin.errors.password && formikLogin.touched.password && (
                <div className="mt-1 text-sm text-red-700 bg-red-100 rounded-md p-2">
                  {formikLogin.errors.password}
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <button
                type="submit"
                disabled={isLoading || !formikLogin.isValid || !formikLogin.dirty}
                className="w-full sm:w-auto px-5 py-2.5 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 disabled:bg-green-400 disabled:cursor-not-allowed transition-all"
              >
                {isLoading ? 'Loading...' : 'Login'}
              </button>
              <span
                onClick={() => navigate("/ForgetPassword")}
                className="text-sm font-medium text-green-600 hover:text-green-800 hover:underline cursor-pointer"
              >
                Forget password?
              </span>
            </div>
          </form>

          {alertMessage && (
            <div className="mt-4 text-sm text-red-700 bg-red-100 rounded-md p-2 text-center">
              {alertMessage}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Login;