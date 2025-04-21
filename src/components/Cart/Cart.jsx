// import { useContext, useEffect, useState } from "react"
// import style from "./Cart.module.css"
// import { cartContext } from "../Context/CartContextProvider"
// import ClipLoader from "react-spinners/esm/ClipLoader";
// import toast from 'react-hot-toast';
// import { Link } from "react-router-dom";
// import { Helmet } from "react-helmet";
// function Cart() {
//         let [currentId,setCurrentId]=useState(null)
//   let {getCart,removeCartItem,updateCartItem,clearCart,productsCart,totalPrice,updatePlusLoading,updateNegativeLoading,updateId,removeLoading,clearLoading}=  useContext(cartContext);
//   function deleteCartItem(id)
//   {setCurrentId(id)
//    let result= removeCartItem(id)
//    if(result)
//    {
//     toast.success('Product is deleted successfully')
//    }
//    else
//    {
//     toast.error('Product is not deleted')
//    }
//   }
//   useEffect(()=>{
// getCart()
//   },[])
//     return <>
//     <Helmet><title>Cart page</title></Helmet>
//    {productsCart? <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-[80%] mx-auto mt-16">
//     <div className="flex items-center justify-between px-10 mt-5">
//     <h3 className="font-medium text-lg text-green-500 text-center py-3">Total cart price: {totalPrice} EGB</h3> 
//     <button onClick={clearCart} type="button" className="cursor-pointer px-5 py-3 text-base font-medium text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300  rounded-lg text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">{clearLoading ? <i className="fas fa-spinner fa-spin"></i> : <span> Empty cart <i className="fa-solid fa-cart-shopping"></i> </span> }</button>
//     </div>

//     <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
//         <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//             <tr>
//                 <th scope="col" className="px-16 py-3">
//                     <span className="sr-only">Image</span>
//                 </th>
//                 <th scope="col" className="px-6 py-3">
//                     Product
//                 </th>
//                 <th scope="col" className="px-6 py-3">
//                     Qty
//                 </th>
//                 <th scope="col" className="px-6 py-3">
//                     Price
//                 </th>
//                 <th scope="col" className="px-6 py-3">
//                     Action
//                 </th>
//             </tr>
//         </thead>
//         <tbody>
//             {productsCart?.map((product)=>
//   <tr key={product.product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
//   <td className="p-4">
//       <img src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt=""/>
//   </td>
//   <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
//       {product.product.title}
//   </td>
//   <td className="px-6 py-4">
//       <div className="flex items-center">
//           <button onClick={()=>updateCartItem(product.product.id,product.count-1,"negative")} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-green-500 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
//               <span className="sr-only">Quantity button</span>
//              {updateNegativeLoading && updateId ==product.product.id?<i className="fas fa-spinner fa-spin"></i> : <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
//                   <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16"/>
//               </svg>}
//           </button>
//           <div>
//               <input disabled id="first_product" className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={ product.count} required />
//           </div>
//           <button onClick={()=>updateCartItem(product.product.id,product.count+1,"plus")} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-green-500 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
//               <span className="sr-only">Quantity button</span>
//              {updatePlusLoading && updateId==product.product.id?<i className="fas fa-spinner fa-spin"></i>  : <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
//                   <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
//               </svg>}
//           </button>
//       </div>
//   </td>
//   <td className="px-6 py-4 font-semibold text-green-500 dark:text-white">
//     {product.price} EGB
//   </td>
//   <td className="px-6 py-4">
 
//       <span onClick={()=>deleteCartItem(product.product.id)} href="#" className="cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline">{removeLoading && currentId==product.product.id?<i className="fas fa-spinner fa-spin"></i> :
//      <span className="flex items-center gap-1"> <i className="fa-solid fa-trash  "></i>Remove</span> }  </span>
//   </td>
// </tr>
//             )}
//         </tbody>
//     </table>
// </div>:<div className="h-dvh flex justify-center items-center"><ClipLoader color="#12ce61" /></div>}
// <div className="w-[80%] mx-auto text-center my-10">
// <Link to={"/payment"} className=" px-15 py-3 text-base font-medium text-center  cursor-pointer rounded-md border-[1px] p-1 w-full border-green-400 border-solid translate-y-20 group-hover:translate-y-0 hover:bg-green-500 hover:text-white transition-all">Payment <i className="fa-regular fa-credit-card "></i></Link>
// </div>
//     </>
// }

// export default Cart
import { useContext, useEffect, useState } from "react";
import { cartContext } from "../Context/CartContextProvider";
import ClipLoader from "react-spinners/esm/ClipLoader";
import toast from 'react-hot-toast';
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

function Cart() {
  let [currentId, setCurrentId] = useState(null);
  let {
    getCart,
    removeCartItem,
    updateCartItem,
    clearCart,
    productsCart,
    totalPrice,
    updatePlusLoading,
    updateNegativeLoading,
    updateId,
    removeLoading,
    clearLoading,
  } = useContext(cartContext);

  function deleteCartItem(id) {
    setCurrentId(id);
    let result = removeCartItem(id);
    if (result) {
      toast.success('Product is deleted successfully');
    } else {
      toast.error('Product is not deleted');
    }
  }

  useEffect(() => {
    getCart();
  }, []);

  return (
    <>
      <Helmet>
        <title>Cart</title>
      </Helmet>
      <section className="min-h-screen px-4 sm:px-6 py-8 sm:py-12">
        <div className="w-full max-w-7xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6">
            Your Cart
          </h2>
          {productsCart === null ? (
            <div className="flex justify-center items-center h-[50vh]">
              <ClipLoader color="#12ce61" size={50} />
            </div>
          ) : productsCart.length === 0 ? (
            <div className="flex justify-center items-center h-[50vh]">
              <p className="text-lg text-gray-600">Your cart is empty</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                <h3 className="text-lg font-medium text-green-600">
                  Total cart price: {totalPrice} EGP
                </h3>
                <button
                  onClick={clearCart}
                  type="button"
                  className="mt-4 sm:mt-0 px-5 py-2.5 text-sm font-medium text-red-600 border border-red-600 rounded-md hover:bg-red-600 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 disabled:bg-red-400 disabled:text-white disabled:cursor-not-allowed transition-all"
                >
                  {clearLoading ? (
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                  ) : (
                    <span>
                      Empty Cart <i className="fa-solid fa-cart-shopping ml-1"></i>
                    </span>
                  )}
                </button>
              </div>
              <table className="w-full text-sm text-left text-gray-600">
                <thead className="text-xs uppercase bg-gray-100 text-gray-700">
                  <tr>
                    <th scope="col" className="px-4 py-3 sm:px-6">
                      <span className="sr-only">Image</span>
                    </th>
                    <th scope="col" className="px-4 py-3 sm:px-6">
                      Product
                    </th>
                    <th scope="col" className="px-4 py-3 sm:px-6">
                      Qty
                    </th>
                    <th scope="col" className="px-4 py-3 sm:px-6">
                      Price
                    </th>
                    <th scope="col" className="px-4 py-3 sm:px-6">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {productsCart?.map((product) => (
                    <tr
                      key={product.product.id}
                      className="bg-white border-b hover:bg-gray-50 transition-colors"
                    >
                      <td className="p-4 text-center">
                        <img
                          src={product.product.imageCover || "https://via.placeholder.com/96"}
                          className="block !w-20 !h-20 sm:w-24 sm:h-24 min-w-20 min-h-20 object-cover rounded mx-auto"
                          alt={product.product.title || "Product"}
                          onError={(e) => {
                            console.log("Image failed to load for product", product.product.id);
                            e.target.src = "https://via.placeholder.com/96";
                          }}
                        />
                      </td>
                      <td className="px-4 py-4 font-semibold text-gray-900 text-sm sm:text-base">
                        {product.product.title}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => updateCartItem(product.product.id, product.count - 1, "negative")}
                            className="p-1.5 text-gray-600 border border-green-600 rounded-full hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-300 disabled:bg-gray-200 disabled:cursor-not-allowed"
                          >
                            {updateNegativeLoading && updateId == product.product.id ? (
                              <i className="fas fa-spinner fa-spin"></i>
                            ) : (
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 18 2"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M1 1h16"
                                />
                              </svg>
                            )}
                          </button>
                          <div>
                            <input
                              disabled
                              id="first_product"
                              className="bg-gray-50 w-12 text-center border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 px-2.5 py-1"
                              placeholder={product.count}
                              required
                            />
                          </div>
                          <button
                            onClick={() => updateCartItem(product.product.id, product.count + 1, "plus")}
                            className="p-1.5 text-gray-600 border border-green-600 rounded-full hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-300 disabled:bg-gray-200 disabled:cursor-not-allowed"
                          >
                            {updatePlusLoading && updateId == product.product.id ? (
                              <i className="fas fa-spinner fa-spin"></i>
                            ) : (
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 18 18"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M9 1v16M1 9h16"
                                />
                              </svg>
                            )}
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-4 font-semibold text-green-600 text-sm sm:text-base">
                        {product.price} EGP
                      </td>
                      <td className="px-4 py-4">
                        <span
                          onClick={() => deleteCartItem(product.product.id)}
                          className="flex items-center gap-1 text-red-600 hover:text-red-800 hover:underline text-sm font-medium"
                        >
                          {removeLoading && currentId == product.product.id ? (
                            <i className="fas fa-spinner fa-spin"></i>
                          ) : (
                            <span className="flex items-center gap-1">
                              <i className="fa-solid fa-trash"></i>Remove
                            </span>
                          )}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {productsCart && productsCart.length > 0 && (
            <div className="flex justify-center mt-6">
              <Link
                to={"/payment"}
                className="w-full sm:w-auto px-5 py-2.5 text-sm font-medium text-green-600 border border-green-600 rounded-md hover:bg-green-600 hover:text-white focus:outline-none focus:ring-4 focus:ring-green-300 text-center transition-all"
              >
                Proceed to Payment <i className="fa-regular fa-credit-card ml-1"></i>
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Cart;