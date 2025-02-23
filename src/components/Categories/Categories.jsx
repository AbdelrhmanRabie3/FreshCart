import { Helmet } from "react-helmet"
import style from "./Categories.module.css"
import axios from "axios"
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/esm/ClipLoader";
function Categories() {
   let [allCategories,setAllCategories] =useState(null)
   let [subCategory,setSubCategory]=useState(null)
   let [clickedSubCategory,setClickedSubCategory]=useState(null)
   let [isLoading,setIsLoading]=useState(false)
   async function getAllCategories()
    {setIsLoading(true)
        try {
        let res=await  axios.get("https://ecommerce.routemisr.com/api/v1/categories")
        console.log(res.data.data);
        setAllCategories(res.data.data)
        setIsLoading(false)
    } catch (error) {
        console.log(error);
        setIsLoading(false)
    }
     
    }
   async function getSubCategory(categoryId,name) {
    
     try {
        let res=await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`)
        console.log(res?.data.data);
        setSubCategory(res.data.data)
        setClickedSubCategory(name)
        
     } catch (error) {
        console.log(error);
        
     }  
    }
    useEffect(()=>{
        getAllCategories()
    },[])
    return <>
    <Helmet><title>Categories page</title></Helmet>
    {isLoading?<div className="h-dvh flex justify-center items-center"><ClipLoader color="#12ce61" /></div>:<>
        <div className="w-[80%] mx-auto grid lg:grid-cols-3 md:grid-cols-4 sm:grid-cols-2 gap-5 py-16">
    {allCategories?.map((category)=><div onClick={()=>getSubCategory(category._id,category.name)} key={category._id} className="max-w-sm cursor-pointer hover:scale-105 transition-all bg-white border border-gray-200 rounded-lg shadow-sm  hover:shadow-green-100 hover:shadow-md hover:border-green-500 dark:bg-gray-800 dark:border-gray-700">
        <img className="rounded-t-lg w-full h-[250px] object-cover" src={category.image} alt={category.name} />
    <div className="p-5">
        
     <h5 className="mb-2 text-2xl text-green-500 font-bold tracking-tight text-center  dark:text-white">{category.name}</h5>
    </div>
</div>
)}
    </div>

    {subCategory? <div>
        <h4 className="text-center text-2xl my-5 text-green-500 font-bold">{clickedSubCategory} sub categories</h4>
        <div className="w-[80%] mx-auto grid lg:grid-cols-3 md:grid-cols-4 sm:grid-cols-2 gap-5 py-16">{subCategory?.map((subCat)=><div key={subCat._id} className="max-w-sm p-6 cursor-pointer hover:scale-105 transition-all bg-white border border-gray-200 rounded-lg shadow-sm  hover:shadow-green-100 hover:shadow-md hover:border-green-500 dark:bg-gray-800 dark:border-gray-700 ">{subCat.name}</div>)}</div>
    </div>:null
    }
    </>}
    
    </>
}

export default Categories
