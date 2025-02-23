import { useContext, useEffect, useState } from "react"
import style from "./WishList.module.css"
import { wishListContext } from "../Context/WishContextProvider"
import  ClipLoader  from 'react-spinners/esm/ClipLoader';
import toast from 'react-hot-toast';
import { Helmet } from "react-helmet";
import { cartContext } from "../Context/CartContextProvider";
function WishList() {
    let [currentId,setCurrentId]=useState(null)
    let [addToCartId,setAddToCartId]=useState(null)
 let{getWishList,wishListProducts,removeWishListProduct,removeFromWishLoading}= useContext(wishListContext)
 let {addToCart,loading}=useContext(cartContext)
 useEffect(()=>{getWishList()
 },[])
async function deleteWishListItem(id) {
    setCurrentId(id)
 let res= await  removeWishListProduct(id)
 if(res.data)
 {
     toast.success('Product is removed successfully')
    }
    else
    {
     toast.error('Product is not removed')
    }
}
async function addProductToCart(id) {
    setAddToCartId(id)
 let res= await  addToCart(id)
 if(res.data)
 {
     toast.success('Product is added to cart successfully')
    }
    else
    {
     toast.error('Product is not added')
    }
}

    return <>
     <Helmet><title>WishList page</title></Helmet>
    {wishListProducts?
<div className="relative overflow-x-auto shadow-md sm:round
ed-lg py-16 w-[80%] mx-auto">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-16 py-3">
                    <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3">
                    Product
                </th>
                <th scope="col" className="px-6 py-3">
                    Price
                </th>
                <th scope="col" className="px-16 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
            {wishListProducts.map((item)=><tr key={item._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="p-4">
                    <img src={item.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={item.title}/>
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                   {item.title}
                </td>

                <td className="px-6 py-4 font-semibold text-green-500 dark:text-white">
                    {item.price} EGB
                </td>
                <td className="px-6 py-4">
                    <div className="flex items-center justify-around">
                    <span onClick={()=>addProductToCart(item._id)} className="cursor-pointer font-medium text-green-600 dark:text-red-500 hover:underline">{loading && addToCartId==item._id?<i className="fas fa-spinner fa-spin"></i>:<span className="flex items-center gap-1"><i className="fa-solid fa-cart-shopping "></i>Add to cart</span> } </span>
                        <span onClick={()=>deleteWishListItem(item._id)} className="cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline">{removeFromWishLoading && currentId==item._id?<i className="fas fa-spinner fa-spin"></i>:<span className="flex items-center gap-1"> <i className="fa-solid fa-trash  "></i>Remove</span> } </span></div>
       
                </td>
            </tr>)}
 
        </tbody>
    </table>
</div>
 :<div className="h-dvh flex justify-center items-center"><ClipLoader color="#12ce61" /></div>}
    </>
}

export default WishList
