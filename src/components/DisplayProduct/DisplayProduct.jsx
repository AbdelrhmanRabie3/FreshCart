import { useContext, useEffect, useState } from "react";
import style from "./DisplayProduct.module.css"
import  axios  from 'axios';
import Products from './../Products/Products';
import { Link } from 'react-router-dom';
import ClipLoader from './../../../node_modules/react-spinners/esm/ClipLoader';
import { useQuery } from "@tanstack/react-query";
import Error from '../Error/Error';
import { cartContext } from "../Context/CartContextProvider";
import toast from 'react-hot-toast';
import { wishListContext } from "../Context/WishContextProvider";
import { Authcontext } from './../Context/AuthContextProvider';
function DisplayProduct() {


    let [currentId,setCurrentId]=useState(null)
    let [currentWishId,setCurrentWishId]=useState(null)
    let [removeCurrentWishId,setRemoveCurrentWishId]=useState(null)
   let {addToCart,loading,getCart}= useContext(cartContext)
   let {addToWishList,addToWishLoading,isInWishList,removeWishListProduct,getWishList,removeFromWishLoading}=useContext(wishListContext)
   let {token}=useContext(Authcontext)
useEffect(()=>{
    getWishList()
    
},[token])
    async function getProducts()
    {  
    return  await axios.get('https://ecommerce.routemisr.com/api/v1/products');
    }
    async function addProductToCart(id) {
        setCurrentId(id)
       let result=await addToCart(id);
    //    console.log(result);
       
       if(result.data)
       {
        toast.success("Product added successfully to your cart")
       }
       else
       {
        toast.error("failed  to add to your cart");
       }
    }
    async function addProductToWishList(id) {
        setCurrentWishId(id)
       let res=await addToWishList(id);
       if(res.data)
       {
        toast.success("Product added successfully to your WishList")
       }
       else
       {
        toast.error("failed  to add to your WishList");
       }
    }
    async function removeProductFromWishList(id) {
        setRemoveCurrentWishId(id)
       let res=await removeWishListProduct(id);
       if(res.data)
       {
        toast.success("Product removed from your WishList")
       }
       else
       {
        toast.error("failed  to remove from your WishList");
       }
    }
   let {data,error,isError,isLoading}= useQuery({
    queryKey:["Products"],
    queryFn:getProducts,
    refetchInterval:60000,
   })
    console.log(data?.data.data);
   
   if(isLoading)
   {
   return <div className="h-dvh flex justify-center items-center"><ClipLoader color="#12ce61" /></div>
   }
if (error) {
    return <Error/>
}
    return <>
    {data? <div className="w-[80%] mx-auto grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 gap-5 py-15 ">
    {data?.data.data.map((Products)=><div key={Products._id} className="py-4 px-3 relative cursor-pointer overflow-hidden group">
    <Link to={`/ProductDetails/${Products._id}/${Products.category.name}`}> 
    <img className="w-full mb-2" src={Products.imageCover} alt={Products.title} />
    <h2 className="text-green-400 text-sm mb-2">{Products.category.name}</h2>
    <h3 className="mb-2">{Products.title.split(" ",2).join(" ")}</h3>
   
    <div className="flex justify-between mb-2">
    {Products.priceAfterDiscount ? <div> <span className="text-red-600 line-through me-2">{Products.price}</span>   <span>{Products.priceAfterDiscount} EGP</span></div> : <span>{Products.price} EGP</span>}

    {
        Products.priceAfterDiscount?<span className="bg-red-600 text-white rounded-b-sm p-1 absolute top-0 left-1/2 -translate-x-1/2">sale</span> :null
    }
    <span><i className="fa-solid fa-star text-yellow-400 me-1" ></i>{Products.ratingsAverage}</span>
    </div>
    </Link>

<div className="flex gap-3 items-center"><button onClick={()=>{addProductToCart(Products._id)}} className="cursor-pointer rounded-md border-[1px] p-1 w-full border-green-400 border-solid translate-y-20 group-hover:translate-y-0 hover:bg-green-500 hover:text-white hover:scale-110 transition-all">
        {loading && currentId==Products._id?<i className="fas fa-spinner fa-spin"></i>:<span> <i className="fa-solid fa-cart-shopping me-2"></i>Add To Cart</span> } </button>

      { (addToWishLoading && currentWishId==Products._id)||(removeFromWishLoading &&removeCurrentWishId== Products._id)?<i className="fas fa-spinner fa-spin"></i> :<i 
  onClick={() => { 
    isInWishList(Products._id) 
      ? removeProductFromWishList(Products._id) 
      : addProductToWishList(Products._id);
  }} 
  className={`fa-solid fa-heart text-2xl transition-all cursor-pointer 
    ${isInWishList(Products._id) ? "text-red-500 hover:text-gray-600" : "text-gray-600 hover:text-red-500"}`}
></i>
      }  </div>
    
</div>)}
</div>: null
}
 


    </>
}

export default DisplayProduct
