import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react"
import { Authcontext } from "./AuthContextProvider";


export const cartContext= createContext();
function CartContextProvider({children}) {
   let[numberOfCartItems,setNumberOfCartItems]= useState(null)
   let[totalPrice,setTotalPrice]= useState(null)
   let[productsCart,setProductsCart]= useState(null)
   let [loading,setLoading]=useState(false)
   let [updatePlusLoading,setUpdatePlusLoading]=useState(false)
   let [updateNegativeLoading,setUpdateNegativeLoading]=useState(false)
   let [removeLoading,setRemoveLoading]=useState(false)
   let [clearLoading,setClearLoading]=useState(false)
   let [updateId,setUpdateId]=useState(null)
   let [cartId,setCartId]=useState(null)
    // let token= localStorage.getItem('token')
    const {token} =useContext(Authcontext)
    async function getCart() {
        
        try {
            const res=await axios.get("https://ecommerce.routemisr.com/api/v1/cart",{
                headers:{token}
            })
            console.log(res.data);
            setProductsCart(res.data.data.products)
            setNumberOfCartItems(res.data.numOfCartItems)
            setTotalPrice(res.data.data.totalCartPrice)
            setCartId(res.data.cartId)
            localStorage.setItem("cartId",res.data.cartId)
        } catch (error) {
            
            return error
        }
       
         }

         useEffect(()=>{
            if(token)
            {
                getCart()
            }
           
         },[token])
async function addToCart(productId)
{setLoading(true)
    try {
        let res=  await axios.post("https://ecommerce.routemisr.com/api/v1/cart",
            {productId},
            {headers:
               {token}
            })
            setNumberOfCartItems(res.data.numOfCartItems) 
            getCart()
            setLoading(false)
            return res;   
    } catch (error) {
        setLoading(false)
        return error;
        
    }
}


     async function removeCartItem(id) {
        try {setRemoveLoading(true)
            const res= await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
                headers:{token}
            })
            setNumberOfCartItems(res.data.numOfCartItems)
            setTotalPrice(res.data.data.totalCartPrice)
            setProductsCart(res.data.data.products)
            setRemoveLoading(false)
            return true;
        } catch (error) {
            setRemoveLoading(false)
            return false
        }
     }
     async function updateCartItem(id,count,status) {
        setUpdateId(id)
        if(status=="plus")
        {
            setUpdatePlusLoading(true)
        }
        else
        {
            setUpdateNegativeLoading(true)
        }
        try {
         const res = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{count},
             {headers:{token}})
             console.log(res);
             setNumberOfCartItems(res.data.numOfCartItems)
             setTotalPrice(res.data.data.totalCartPrice)
             setProductsCart(res.data.data.products)
             if(status=="plus")
                {
                    setUpdatePlusLoading(false)
                }
                else
                {
                    setUpdateNegativeLoading(false)
                }
        } catch (error) {
            if(status=="plus")
                {
                    setUpdatePlusLoading(false)
                }
                else
                {
                    setUpdateNegativeLoading(false)
                }
         console.log(error);
         
        }
     }
     async function clearCart() {
        setClearLoading(true)
    try {
        let res=  await axios.delete('https://ecommerce.routemisr.com/api/v1/cart',{headers:{token}})
          setNumberOfCartItems(0)
          setTotalPrice(0)
          setProductsCart([])
          setClearLoading(false)
    } catch (error) {
        setClearLoading(false)
        return error
    }   
     }
    return <cartContext.Provider value={{addToCart,getCart,removeCartItem,updateCartItem,clearCart,numberOfCartItems,totalPrice,productsCart,loading,updatePlusLoading,updateNegativeLoading,removeLoading,clearLoading,updateId,cartId}}>
{children}
    </cartContext.Provider>
}

export default CartContextProvider
