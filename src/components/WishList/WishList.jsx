// import { useContext, useEffect, useState } from "react"
// import style from "./WishList.module.css"
// import { wishListContext } from "../Context/WishContextProvider"
// import  ClipLoader  from 'react-spinners/esm/ClipLoader';
// import toast from 'react-hot-toast';
// import { Helmet } from "react-helmet";
// import { cartContext } from "../Context/CartContextProvider";
// function WishList() {
//     let [currentId,setCurrentId]=useState(null)
//     let [addToCartId,setAddToCartId]=useState(null)
//  let{getWishList,wishListProducts,removeWishListProduct,removeFromWishLoading}= useContext(wishListContext)
//  let {addToCart,loading}=useContext(cartContext)
//  useEffect(()=>{getWishList()
//  },[])
// async function deleteWishListItem(id) {
//     setCurrentId(id)
//  let res= await  removeWishListProduct(id)
//  if(res.data)
//  {
//      toast.success('Product is removed successfully')
//     }
//     else
//     {
//      toast.error('Product is not removed')
//     }
// }
// async function addProductToCart(id) {
//     setAddToCartId(id)
//  let res= await  addToCart(id)
//  if(res.data)
//  {
//      toast.success('Product is added to cart successfully')
//     }
//     else
//     {
//      toast.error('Product is not added')
//     }
// }

//     return <>
//      <Helmet><title>WishList page</title></Helmet>
//     {wishListProducts?
// <div className="relative overflow-x-auto shadow-md sm:round
// ed-lg py-16 w-[80%] mx-auto">
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
//                     Price
//                 </th>
//                 <th scope="col" className="px-16 py-3">
//                     Action
//                 </th>
//             </tr>
//         </thead>
//         <tbody>
//             {wishListProducts.map((item)=><tr key={item._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
//                 <td className="p-4">
//                     <img src={item.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={item.title}/>
//                 </td>
//                 <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
//                    {item.title}
//                 </td>

//                 <td className="px-6 py-4 font-semibold text-green-500 dark:text-white">
//                     {item.price} EGB
//                 </td>
//                 <td className="px-6 py-4">
//                     <div className="flex items-center justify-around">
//                     <span onClick={()=>addProductToCart(item._id)} className="cursor-pointer font-medium text-green-600 dark:text-red-500 hover:underline">{loading && addToCartId==item._id?<i className="fas fa-spinner fa-spin"></i>:<span className="flex items-center gap-1"><i className="fa-solid fa-cart-shopping "></i>Add to cart</span> } </span>
//                         <span onClick={()=>deleteWishListItem(item._id)} className="cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline">{removeFromWishLoading && currentId==item._id?<i className="fas fa-spinner fa-spin"></i>:<span className="flex items-center gap-1"> <i className="fa-solid fa-trash  "></i>Remove</span> } </span></div>
       
//                 </td>
//             </tr>)}
 
//         </tbody>
//     </table>
// </div>
//  :<div className="h-dvh flex justify-center items-center"><ClipLoader color="#12ce61" /></div>}
//     </>
// }

// export default WishList
import { useContext, useEffect, useState } from "react";
import { wishListContext } from "../Context/WishContextProvider";
import ClipLoader from "react-spinners/esm/ClipLoader";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";
import { cartContext } from "../Context/CartContextProvider";

function WishList() {
  let [currentId, setCurrentId] = useState(null);
  let [addToCartId, setAddToCartId] = useState(null);
  let { getWishList, wishListProducts, removeWishListProduct, removeFromWishLoading } = useContext(wishListContext);
  let { addToCart, loading } = useContext(cartContext);

  useEffect(() => {
    getWishList();
  }, []);

  async function deleteWishListItem(id) {
    setCurrentId(id);
    let res = await removeWishListProduct(id);
    if (res.data) {
      toast.success('Product is removed successfully');
    } else {
      toast.error('Product is not removed');
    }
  }

  async function addProductToCart(id) {
    setAddToCartId(id);
    let res = await addToCart(id);
    if (res.data) {
      toast.success('Product is added to cart successfully');
    } else {
      toast.error('Product is not added');
    }
  }

  return (
    <>
      <Helmet>
        <title>Wishlist</title>
      </Helmet>
      <section className="min-h-screen px-4 sm:px-6 py-8 sm:py-12">
        <div className="w-full max-w-7xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6">
            Your Wishlist
          </h2>
          {wishListProducts === null ? (
            <div className="flex justify-center items-center h-[50vh]">
              <ClipLoader color="#12ce61" size={50} />
            </div>
          ) : wishListProducts.length === 0 ? (
            <div className="flex justify-center items-center h-[50vh]">
              <p className="text-lg text-gray-600">Your wishlist is empty</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
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
                      Price
                    </th>
                    <th scope="col" className="px-4 py-3 sm:px-6">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {wishListProducts.map((item) => (
                    <tr
                      key={item._id}
                      className="bg-white border-b hover:bg-gray-50 transition-colors"
                    >
                      <td className="p-4 text-center">
                        <img
                          src={item.imageCover || "https://via.placeholder.com/96"}
                          className="block !w-20 !h-20 sm:w-24 sm:h-24 min-w-20 min-h-20 object-cover rounded mx-auto"
                          alt={item.title || "Product"}
                          onError={(e) => {
                            console.log("Image failed to load for product", item._id);
                            e.target.src = "https://via.placeholder.com/96";
                          }}
                        />
                      </td>
                      <td className="px-4 py-4 font-semibold text-gray-900 text-sm sm:text-base">
                        {item.title}
                      </td>
                      <td className="px-4 py-4 font-semibold text-green-600 text-sm sm:text-base">
                        {item.price} EGP
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-center gap-4">
                          <span
                            onClick={() => addProductToCart(item._id)}
                            className="flex items-center justify-center gap-1 text-green-600 hover:text-green-800 hover:underline text-sm font-medium cursor-pointer px-2 py-1 min-w-[100px] text-center"
                          >
                            {loading && addToCartId == item._id ? (
                              <i className="fas fa-spinner fa-spin"></i>
                            ) : (
                              <span className="flex items-center gap-1">
                                <i className="fa-solid fa-cart-shopping"></i>Add to cart
                              </span>
                            )}
                          </span>
                          <span
                            onClick={() => deleteWishListItem(item._id)}
                            className="flex items-center justify-center gap-1 text-red-600 hover:text-red-800 hover:underline text-sm font-medium cursor-pointer px-2 py-1 min-w-[100px] text-center"
                          >
                            {removeFromWishLoading && currentId == item._id ? (
                              <i className="fas fa-spinner fa-spin"></i>
                            ) : (
                              <span className="flex items-center gap-1">
                                <i className="fa-solid fa-trash"></i>Remove
                              </span>
                            )}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default WishList;