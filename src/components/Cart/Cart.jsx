import { useContext, useEffect, useState } from "react"
import style from "./Cart.module.css"
import { cartContext } from "../Context/CartContextProvider"
import ClipLoader from "react-spinners/esm/ClipLoader";
import toast from 'react-hot-toast';
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
function Cart() {
        let [currentId,setCurrentId]=useState(null)
  let {getCart,removeCartItem,updateCartItem,clearCart,productsCart,totalPrice,updatePlusLoading,updateNegativeLoading,updateId,removeLoading,clearLoading}=  useContext(cartContext);
  function deleteCartItem(id)
  {setCurrentId(id)
   let result= removeCartItem(id)
   if(result)
   {
    toast.success('Product is deleted successfully')
   }
   else
   {
    toast.error('Product is not deleted')
   }
  }
  useEffect(()=>{
getCart()
  },[])
    return <>
    <Helmet><title>Cart page</title></Helmet>
   {productsCart? <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-[80%] mx-auto mt-16">
    <div className="flex items-center justify-between px-10 mt-5">
    <h3 className="font-medium text-lg text-green-500 text-center py-3">Total cart price: {totalPrice} EGB</h3> 
    <button onClick={clearCart} type="button" className="cursor-pointer px-5 py-3 text-base font-medium text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300  rounded-lg text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">{clearLoading ? <i className="fas fa-spinner fa-spin"></i> : <span> Empty cart <i className="fa-solid fa-cart-shopping"></i> </span> }</button>
    </div>

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
                    Qty
                </th>
                <th scope="col" className="px-6 py-3">
                    Price
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
            {productsCart?.map((product)=>
  <tr key={product.product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
  <td className="p-4">
      <img src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt=""/>
  </td>
  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
      {product.product.title}
  </td>
  <td className="px-6 py-4">
      <div className="flex items-center">
          <button onClick={()=>updateCartItem(product.product.id,product.count-1,"negative")} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-green-500 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
              <span className="sr-only">Quantity button</span>
             {updateNegativeLoading && updateId ==product.product.id?<i className="fas fa-spinner fa-spin"></i> : <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16"/>
              </svg>}
          </button>
          <div>
              <input disabled id="first_product" className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={ product.count} required />
          </div>
          <button onClick={()=>updateCartItem(product.product.id,product.count+1,"plus")} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-green-500 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
              <span className="sr-only">Quantity button</span>
             {updatePlusLoading && updateId==product.product.id?<i className="fas fa-spinner fa-spin"></i>  : <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
              </svg>}
          </button>
      </div>
  </td>
  <td className="px-6 py-4 font-semibold text-green-500 dark:text-white">
    {product.price} EGB
  </td>
  <td className="px-6 py-4">
 
      <span onClick={()=>deleteCartItem(product.product.id)} href="#" className="cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline">{removeLoading && currentId==product.product.id?<i className="fas fa-spinner fa-spin"></i> :
     <span className="flex items-center gap-1"> <i className="fa-solid fa-trash  "></i>Remove</span> }  </span>
  </td>
</tr>
            )}
        </tbody>
    </table>
</div>:<div className="h-dvh flex justify-center items-center"><ClipLoader color="#12ce61" /></div>}
<div className="w-[80%] mx-auto text-center my-10">
<Link to={"/payment"} className=" px-15 py-3 text-base font-medium text-center  cursor-pointer rounded-md border-[1px] p-1 w-full border-green-400 border-solid translate-y-20 group-hover:translate-y-0 hover:bg-green-500 hover:text-white transition-all">Payment <i className="fa-regular fa-credit-card "></i></Link>
</div>
    </>
}

export default Cart
