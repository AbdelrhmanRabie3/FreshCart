import style from "./Register.module.css"
import { useFormik} from 'formik'
import axios from "axios"
import { useContext, useState } from "react";
import {useNavigate} from "react-router-dom"
import * as YUp from "yup"
import { Authcontext } from '../Context/AuthContextProvider';
function Register() {
let {setToken} =useContext(Authcontext);
let [alertMessage,setAlertMessage]=useState(null);
let [isLoading,setIsLoading]=useState(false);
 let navigate =useNavigate()
 let validationSchema= YUp.object().shape(
    {
        name:YUp.string().required('name is required').min(3,'min chars is 3').max(11,'max chars is 11'),
        email:YUp.string().required('email is required').email('email is invalid'),
        password:YUp.string().required('password is required').matches(/^[A-Za-z][1-9]{5,7}$/,'password must start with letter and has min 6 letters and max 8 '),
        rePassword:YUp.string().required('erPassword is required').oneOf([YUp.ref('password')],'password and rePassword must be the same'),
        phone:YUp.string().required('phone is required').matches(/^01[0125][0-9]{8}$/,'phone number is invalid'),
    }
 )
 async  function handleRegister(values)
    {   setIsLoading(true);
        console.log(values);
        try {
            let res= await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',values);
            localStorage.setItem('token',res.data.token);
            setToken(res.data.token)
           console.log(res);
           setIsLoading(false);
           navigate('/');
           
        } catch (error) {
            
            console.log(error.response.data.message);
            setAlertMessage(error.response.data.message);   
            setIsLoading(false);
        }
       
    }
    
let formikRegister =useFormik({
    initialValues:{name:"",
        email:"",
        password:"",
        rePassword:"",
        phone:"",
    },
    validationSchema,
    onSubmit:handleRegister,
})
    return <>
    <section className="py-20 w-1/2 mx-auto flex items-start justify-center flex-col">
        <h2 className="[font-size:20px] mb-1.5">Register Now:</h2>
    <form className="w-full" action="" onSubmit={formikRegister.handleSubmit}>
   <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">name:</label>
            <input type="text" id="name" className= " bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=""  
            name="name"
            value={formikRegister.values.name}
            onChange={formikRegister.handleChange}
            onBlur={formikRegister.handleBlur}
            />
    </div>
    {formikRegister.errors.name && formikRegister.touched.name? <div className="p-4 mb-4 text-sm w-full text-center mt-2 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium">{formikRegister.errors.name}</span> 
</div>:null}
   <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">email:</label>
            <input type="text" id="email" className= " bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" 
                        name="email"
                        value={formikRegister.values.email}
                        onChange={formikRegister.handleChange}
                        onBlur={formikRegister.handleBlur} />
        </div>
        {formikRegister.errors.email && formikRegister.touched.email? <div className="p-4 mb-4 text-sm w-full text-center mt-2 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
         <span className="font-medium">{formikRegister.errors.email}</span> 
        </div>:null}
   <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">password:</label>
            <input type="password" id="password" className= " bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" 
                        name="password"
                        value={formikRegister.values.password}
                        onChange={formikRegister.handleChange}
                        onBlur={formikRegister.handleBlur}
            />
        </div>
        {formikRegister.errors.password && formikRegister.touched.password? <div className="p-4 mb-4 text-sm w-full text-center mt-2 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
         <span className="font-medium">{formikRegister.errors.password}</span> 
        </div>:null}
   <div>
            <label htmlFor="rePassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">rePassword:</label>
            <input type="password" id="rePassword" className= " bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=""  
                        name="rePassword"
                        value={formikRegister.values.repassword}
                        onChange={formikRegister.handleChange}
                        onBlur={formikRegister.handleBlur}
            />
        </div>
        {formikRegister.errors.rePassword && formikRegister.touched.rePassword? <div className="p-4 mb-4 text-sm w-full text-center mt-2 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
         <span className="font-medium">{formikRegister.errors.rePassword}</span> 
        </div>:null}
        <div>
            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">phone:</label>
            <input type="tel" id="phone" className= " bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=""  
                        name="phone"
                        value={formikRegister.values.phone}
                        onChange={formikRegister.handleChange}
                        onBlur={formikRegister.handleBlur}
            />
        </div>
        {formikRegister.errors.phone && formikRegister.touched.phone? <div className="p-4 mb-4 text-sm w-full text-center mt-2 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
         <span className="font-medium">{formikRegister.errors.phone}</span> 
        </div>:null}
        <button disabled={isLoading?true:false} type="submit" className="cursor-pointer mt-4 self-end focus:outline-none text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-500 dark:hover:bg-green-700 dark:focus:ring-green-800">{isLoading?'Loading...':'Register'} </button>
   </form>
{alertMessage? <div className="p-4 mb-4 text-sm w-full text-center mt-2 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium">{alertMessage}</span> 
</div>:null}
    </section>
   
    </>
}

export default Register
