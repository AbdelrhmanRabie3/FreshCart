// import { useContext, useEffect, useState } from "react";
// import style from "./DisplayProduct.module.css"
// import  axios  from 'axios';
// import Products from './../Products/Products';
// import { Link } from 'react-router-dom';
// import ClipLoader from './../../../node_modules/react-spinners/esm/ClipLoader';
// import { useQuery } from "@tanstack/react-query";
// import Error from '../Error/Error';
// import { cartContext } from "../Context/CartContextProvider";
// import toast from 'react-hot-toast';
// import { wishListContext } from "../Context/WishContextProvider";
// import { Authcontext } from './../Context/AuthContextProvider';
// function DisplayProduct() {


//     let [currentId,setCurrentId]=useState(null)
//     let [currentWishId,setCurrentWishId]=useState(null)
//     let [removeCurrentWishId,setRemoveCurrentWishId]=useState(null)
//    let {addToCart,loading,getCart}= useContext(cartContext)
//    let {addToWishList,addToWishLoading,isInWishList,removeWishListProduct,getWishList,removeFromWishLoading}=useContext(wishListContext)
//    let {token}=useContext(Authcontext)
// useEffect(()=>{
//     getWishList()
    
// },[token])
//     async function getProducts()
//     {  
//     return  await axios.get('https://ecommerce.routemisr.com/api/v1/products');
//     }
//     async function addProductToCart(id) {
//         setCurrentId(id)
//        let result=await addToCart(id);
//     //    console.log(result);
       
//        if(result.data)
//        {
//         toast.success("Product added successfully to your cart")
//        }
//        else
//        {
//         toast.error("failed  to add to your cart");
//        }
//     }
//     async function addProductToWishList(id) {
//         setCurrentWishId(id)
//        let res=await addToWishList(id);
//        if(res.data)
//        {
//         toast.success("Product added successfully to your WishList")
//        }
//        else
//        {
//         toast.error("failed  to add to your WishList");
//        }
//     }
//     async function removeProductFromWishList(id) {
//         setRemoveCurrentWishId(id)
//        let res=await removeWishListProduct(id);
//        if(res.data)
//        {
//         toast.success("Product removed from your WishList")
//        }
//        else
//        {
//         toast.error("failed  to remove from your WishList");
//        }
//     }
//    let {data,error,isError,isLoading}= useQuery({
//     queryKey:["Products"],
//     queryFn:getProducts,
//     refetchInterval:60000,
//    })
//     console.log(data?.data.data);
   
//    if(isLoading)
//    {
//    return <div className="h-dvh flex justify-center items-center"><ClipLoader color="#12ce61" /></div>
//    }
// if (error) {
//     return <Error/>
// }
//     return <>
//     {data? <div className="w-[80%] mx-auto grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 gap-5 py-15 ">
//     {data?.data.data.map((Products)=><div key={Products._id} className="py-4 px-3 relative cursor-pointer overflow-hidden group">
//     <Link to={`/ProductDetails/${Products._id}/${Products.category.name}`}> 
//     <img className="w-full mb-2" src={Products.imageCover} alt={Products.title} />
//     <h2 className="text-green-400 text-sm mb-2">{Products.category.name}</h2>
//     <h3 className="mb-2">{Products.title.split(" ",2).join(" ")}</h3>
   
//     <div className="flex justify-between mb-2">
//     {Products.priceAfterDiscount ? <div> <span className="text-red-600 line-through me-2">{Products.price}</span>   <span>{Products.priceAfterDiscount} EGP</span></div> : <span>{Products.price} EGP</span>}

//     {
//         Products.priceAfterDiscount?<span className="bg-red-600 text-white rounded-b-sm p-1 absolute top-0 left-1/2 -translate-x-1/2">sale</span> :null
//     }
//     <span><i className="fa-solid fa-star text-yellow-400 me-1" ></i>{Products.ratingsAverage}</span>
//     </div>
//     </Link>

// <div className="flex gap-3 items-center"><button onClick={()=>{addProductToCart(Products._id)}} className="cursor-pointer rounded-md border-[1px] p-1 w-full border-green-400 border-solid translate-y-20 group-hover:translate-y-0 hover:bg-green-500 hover:text-white hover:scale-110 transition-all">
//         {loading && currentId==Products._id?<i className="fas fa-spinner fa-spin"></i>:<span> <i className="fa-solid fa-cart-shopping me-2"></i>Add To Cart</span> } </button>

//       { (addToWishLoading && currentWishId==Products._id)||(removeFromWishLoading &&removeCurrentWishId== Products._id)?<i className="fas fa-spinner fa-spin"></i> :<i 
//   onClick={() => { 
//     isInWishList(Products._id) 
//       ? removeProductFromWishList(Products._id) 
//       : addProductToWishList(Products._id);
//   }} 
//   className={`fa-solid fa-heart text-2xl transition-all cursor-pointer 
//     ${isInWishList(Products._id) ? "text-red-500 hover:text-gray-600" : "text-gray-600 hover:text-red-500"}`}
// ></i>
//       }  </div>
    
// </div>)}
// </div>: null
// }
 


//     </>
// }

// export default DisplayProduct
import { useContext, useEffect, useState } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import ClipLoader from 'react-spinners/esm/ClipLoader';
import { useQuery } from "@tanstack/react-query";
import { cartContext } from "../Context/CartContextProvider";
import toast from 'react-hot-toast';
import { wishListContext } from "../Context/WishContextProvider";
import { Authcontext } from '../Context/AuthContextProvider';
import { Helmet } from "react-helmet";

function DisplayProduct() {
  let [currentId, setCurrentId] = useState(null);
  let [currentWishId, setCurrentWishId] = useState(null);
  let [removeCurrentWishId, setRemoveCurrentWishId] = useState(null);
  let { addToCart, loading, getCart } = useContext(cartContext);
  let { addToWishList, addToWishLoading, isInWishList, removeWishListProduct, getWishList, removeFromWishLoading } = useContext(wishListContext);
  let { token } = useContext(Authcontext);

  useEffect(() => {
    if (token) {
      getWishList();
    }
  }, [token]);

  async function getProducts() {
    return await axios.get('https://ecommerce.routemisr.com/api/v1/products');
  }

  async function addProductToCart(id) {
    setCurrentId(id);
    let result = await addToCart(id);
    if (result.data) {
      toast.success("Product added successfully to your cart");
    } else {
      toast.error("Failed to add to your cart");
    }
  }

  async function addProductToWishList(id) {
    setCurrentWishId(id);
    let res = await addToWishList(id);
    if (res.data) {
      toast.success("Product added successfully to your WishList");
    } else {
      toast.error("Failed to add to your WishList");
    }
  }

  async function removeProductFromWishList(id) {
    setRemoveCurrentWishId(id);
    let res = await removeWishListProduct(id);
    if (res.data) {
      toast.success("Product removed from your WishList");
    } else {
      toast.error("Failed to remove from your WishList");
    }
  }

  let { data, error, isError, isLoading } = useQuery({
    queryKey: ["Products"],
    queryFn: getProducts,
    refetchInterval: 60000,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <ClipLoader color="#12ce61" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-center text-red-500">
          <h2 className="text-xl sm:text-2xl font-semibold">Error</h2>
          <p className="text-sm sm:text-base">{error.message || "Failed to load products"}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Products page</title>
      </Helmet>
      {data && (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
            {data?.data.data.map((product) => (
              <div
                key={product._id}
                className="relative bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:border-green-500 transition-all group min-h-[24rem]"
              >
                <Link to={`/ProductDetails/${product._id}/${product.category.name}`}>
                  <img
                    className="w-full h-auto  rounded-t-lg"
                    src={product.imageCover || "https://placehold.co/300x200?text=No+Image"}
                    alt={product.title || "Product"}
                    onError={(e) => {
                      e.target.src = "https://placehold.co/300x200?text=Error";
                      console.error("Failed to load product image:", product.imageCover);
                    }}
                  />
                  <div className="p-4">
                    <h2 className="text-sm sm:text-base text-green-400 mb-2">
                      {product.category.name}
                    </h2>
                    <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">
                      {product.title.split(" ", 2).join(" ")}
                    </h3>
                    <div className="flex justify-between items-center mb-2">
                      {product.priceAfterDiscount ? (
                        <div className="flex items-center gap-2">
                          <span className="text-red-600 line-through text-sm sm:text-base">
                            {product.price}
                          </span>
                          <span className="text-gray-900 text-sm sm:text-base">
                            {product.priceAfterDiscount} EGP
                          </span>
                        </div>
                      ) : (
                        <span className="text-gray-900 text-sm sm:text-base">
                          {product.price} EGP
                        </span>
                      )}
                      <div className="flex items-center">
                        <i className="fa-solid fa-star text-yellow-400 text-sm mr-1"></i>
                        <span className="text-sm sm:text-base">{product.ratingsAverage}</span>
                      </div>
                    </div>
                  </div>
                  {product.priceAfterDiscount && (
                    <span className="absolute top-2 left-2 bg-red-600 text-white text-xs sm:text-sm px-2 py-1 rounded">
                      Sale
                    </span>
                  )}
                </Link>
                <div className="p-4 flex items-center gap-2 sm:gap-3">
                  <button
                    onClick={() => addProductToCart(product._id)}
                    className="flex-1 px-4 py-2 text-sm sm:text-base text-green-700 border border-green-400 rounded-md hover:bg-green-500 hover:text-white hover:scale-105 transition-all opacity-0 group-hover:opacity-100 translate-y-10 group-hover:translate-y-0"
                  >
                    {loading && currentId === product._id ? (
                      <i className="fas fa-spinner fa-spin"></i>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <i className="fa-solid fa-cart-shopping"></i> Add To Cart
                      </span>
                    )}
                  </button>
                  {(addToWishLoading && currentWishId === product._id) ||
                  (removeFromWishLoading && removeCurrentWishId === product._id) ? (
                    <i className="fas fa-spinner fa-spin text-xl sm:text-2xl"></i>
                  ) : (
                    <i
                      onClick={() =>
                        isInWishList(product._id)
                          ? removeProductFromWishList(product._id)
                          : addProductToWishList(product._id)
                      }
                      className={`fa-solid fa-heart text-xl sm:text-2xl cursor-pointer transition-all opacity-0 group-hover:opacity-100 translate-y-10 group-hover:translate-y-0 ${
                        isInWishList(product._id)
                          ? "text-red-500 hover:text-gray-600"
                          : "text-gray-600 hover:text-red-500"
                      }`}
                    ></i>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default DisplayProduct;