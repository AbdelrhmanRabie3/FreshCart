import axios from "axios"
import style from "./ProductDetails.module.css"
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ClipLoader from "react-spinners/esm/ClipLoader";
import Slider from "react-slick";
import { Helmet } from "react-helmet";
import { cartContext } from "../Context/CartContextProvider";
import toast from 'react-hot-toast';
function ProductDetails() {
  let {id,category}= useParams();
  let [ product ,setProduct] =useState(null)
  let [ relatedProducts ,setRelatedProducts] =useState(null)
   let {addToCart,loading}=useContext(cartContext)
  console.log(id);
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay:true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  async function getProducts()
{
 let res=  await axios.get('https://ecommerce.routemisr.com/api/v1/products');
 console.log(res.data.data);
 let related=res.data.data.filter((products)=>products.category.name ==category)
setRelatedProducts(related)
 
}
  async  function getProductDetails()
    {
      let res= await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      console.log(res.data.data);
      setProduct(res.data.data);
    }

    useEffect(()=>{
      getProductDetails()
      getProducts()
    },[id])
async function addProductToCart(id) {
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
    <Helmet><title>Product Details page</title></Helmet>
   {product?<> <div className="w-[80%] mx-auto  grid grid-cols-[1fr_2fr] gap-5 items-center ">
      <img className="w-full" src={product?.imageCover} alt="" />
      <div>
      <h2 className="text-green-400 text-sm mb-2">{product?.category.name}</h2>
      <h3 className="mb-2">{product?.title.split(" ",2).join(" ")}</h3>
   <p>{product?.description}</p>
   {product?.priceAfterDiscount ? <div> <span className="text-red-600 line-through me-2 mb-2">{product?.price}</span>   <span>{product?.priceAfterDiscount} EGP</span></div> : <span>{product?.price} EGP</span>}


    <div className="flex justify-between ">
    <span><i className="fa-solid fa-star text-yellow-400 me-1" ></i>{product?.ratingsAverage}</span>
    </div>

    <button onClick={()=>addProductToCart(product._id)} className="cursor-pointer rounded-md border-[1px] p-1 w-full border-green-400 border-solid translate-y-20 group-hover:translate-y-0 hover:bg-green-500 hover:text-white transition-all"> {loading?<i className="fas fa-spinner fa-spin"></i> :<span><i className="fa-solid fa-cart-shopping me-2"></i> Add To Cart</span>}  </button>
      </div>

      
    </div> 

 
    <div className="w-[80%] mx-auto  ">
    <Slider {...settings} className="my-16 w-[90%] mx-auto ">
    {
    
    relatedProducts?.map((item)=> <div key={item._id} className=" ">
<Link to={`/ProductDetails/${item._id}/${item.category.name}`}>
<img className="" src={item.imageCover} alt={item.title} />
<h2 className="text-green-400 text-sm mb-2">{item.category.name}</h2>
<h3 className="mb-2 " >{item.title.split(" ",2).join(" ")}</h3>

<div className="flex justify-between mb-2 me-5">
{item.priceAfterDiscount ? <div> <span className="text-red-600 line-through me-2">{item.price}</span>   <span>{item.priceAfterDiscount} EGP</span></div> : <span>{item.price} EGP</span>}

{
  item.priceAfterDiscount?<span className="bg-red-600 text-white rounded-b-sm p-1 absolute top-0 left-1/2 -translate-x-1/2">sale</span> :null
}
<span><i className="fa-solid fa-star text-yellow-400 me-1" ></i>{item.ratingsAverage}</span>
</div>
</Link>

 </div>)}
    </Slider>
</div> 
    </> 
    
    :<div className="h-dvh flex justify-center items-center"><ClipLoader color="#12ce61" /></div>} 


    </>
}





export default ProductDetails
