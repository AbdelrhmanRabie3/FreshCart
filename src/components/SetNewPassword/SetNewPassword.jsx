import { useContext, useState } from "react";
import style from "./SetNewPassword.module.css"
import * as YUp from "yup"
import axios from "axios";
import { useFormik} from 'formik'
import { Navigate, useNavigate } from "react-router-dom";
import { Authcontext } from "../Context/AuthContextProvider";
import toast from '../../../node_modules/react-hot-toast/src/index';
function SetNewPassword() {
    let logInNavigate=useNavigate()
    let {setToken}= useContext(Authcontext)
    let [isLoading,setIsLoading]=useState(false);
    let [alertMessage,setAlertMessage]=useState(null);
    let validationSchema= YUp.object().shape(
        {
            email:YUp.string().required('email is required').email('email is invalid'),
            newPassword:YUp.string().required('password is required').matches(/^[A-Za-z][1-9]{5,7}$/,'password must start with letter and has min 6 letters and max 8 '),
        }
     )
     async  function handleSetNewPassword(values)
        {   setIsLoading(true);
            console.log(values);
            try {
                let res= await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword',values);
                console.log(res);
               setIsLoading(false);
            //    setToken(res.data.token)
               toast.success("Password is changed successfully")
               setTimeout(() => {
                logInNavigate("/Login")
            }, 3000);
            } catch (error) {
                
                console.log(error.response.data.message);
                setAlertMessage(error.response.data.message);   
                setIsLoading(false);
                toast.error("Password is not changed");
            }
           
        }
        
    let formikSetNewPassword =useFormik({
        initialValues:{
            email:"",
            newPassword:"",
        },
        validationSchema,
        onSubmit:handleSetNewPassword,
    })
    
    
        return <>
        <section className="py-22 w-1/2 mx-auto flex items-start justify-center flex-col">
            <h2 className="[font-size:20px] mb-1.5">Set new password:</h2>
        <form className="w-full" action="" onSubmit={formikSetNewPassword.handleSubmit}>
     
       <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">email:</label>
                <input type="text" id="email" className= " bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" 
                            name="email"
                            value={formikSetNewPassword.values.email}
                            onChange={formikSetNewPassword.handleChange}
                            onBlur={formikSetNewPassword.handleBlur} />
            </div>
            {formikSetNewPassword.errors.email && formikSetNewPassword.touched.email? <div className="p-4 mb-4 text-sm w-full text-center mt-2 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
             <span className="font-medium">{formikSetNewPassword.errors.email}</span> 
            </div>:null}
       <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New password:</label>
                <input type="password" id="password" className= " bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" 
                            name="newPassword"
                            value={formikSetNewPassword.values.newPassword}
                            onChange={formikSetNewPassword.handleChange}
                            onBlur={formikSetNewPassword.handleBlur}
                />
            </div>
            {formikSetNewPassword.errors.newPassword && formikSetNewPassword.touched.newPassword? <div className="p-4 mb-4 text-sm w-full text-center mt-2 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
             <span className="font-medium">{formikSetNewPassword.errors.newPassword}</span> 
            </div>:null}
            <div className=" flex justify-between items-center"><button disabled={isLoading?true:false} type="submit" className="cursor-pointer mt-4 self-end focus:outline-none text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-500 dark:hover:bg-green-700 dark:focus:ring-green-800">{isLoading?'Loading...':'Update password'} </button>
            </div>
           
       </form>
    {alertMessage? <div className="p-4 mb-4 text-sm w-full text-center mt-2 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
      <span className="font-medium">{alertMessage}</span> 
    </div>:null}
        </section>
       
        </>
}

export default SetNewPassword
