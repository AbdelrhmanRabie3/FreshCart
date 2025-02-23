import axios from "axios"
import {createContext, useContext, useEffect, useState } from "react"
import { Authcontext } from "./AuthContextProvider"

export const wishListContext= createContext()
function WishContextProvider({children}) {
    let [addToWishLoading,setAddToWishLoading]=useState(false)
    let [removeFromWishLoading,setRemoveFromWishLoading]=useState(false)
    let [wishListProducts,setWishListProducts]=useState(null)
    // let [productsIds,setProductsIds]=useState(null)
    // let [isInWishList,setIsInWishList]=useState(null)
    
    // let token=localStorage.getItem("token")
    const {token} =useContext(Authcontext)
    
   async function getWishList() {
    try {
       let res= await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist",
           {
               headers:{token}
           }
       )
       console.log(res.data.data);
       setWishListProducts(res.data.data)
       return res
    } catch (error) {
       console.log(error);
       return error
       
    } 
       
   }
 async function addToWishList(productId) {
    setAddToWishLoading(true)
   try {
    let res=await  axios.post("https://ecommerce.routemisr.com/api/v1/wishlist",{
        productId
    },{
        headers:{token}
    })
    getWishList()
    setAddToWishLoading(false)
    console.log(res.data.data);
    return res;
   } catch (error) {
    setAddToWishLoading(false)
    return error
   }  
        
    }

useEffect(()=>{
    if(token)
    {
        getWishList()
    }
    
},[token])
    async function removeWishListProduct(productId) {
        setRemoveFromWishLoading(true)
    try {
     let res = await  axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,{headers:{token}})
     console.log(res.data.data);
    //   setProductsIds(res.data.data)
      setRemoveFromWishLoading(false)
      console.log(res.data);
      getWishList()
        return res
    } catch (error) {
        console.log(error);
        setRemoveFromWishLoading(false)
        
    }  
    }
        function isInWishList(productId) {
          return  wishListProducts?.some((items)=>items._id==productId)
        }
    return <wishListContext.Provider value={{addToWishList,addToWishLoading,getWishList,wishListProducts,removeWishListProduct,removeFromWishLoading,isInWishList}}>
        {children}
    </wishListContext.Provider>
    
}

export default WishContextProvider
