// import axios from "axios"
// import style from "./ProductDetails.module.css"
// import { useContext, useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import ClipLoader from "react-spinners/esm/ClipLoader";
// import Slider from "react-slick";
// import { Helmet } from "react-helmet";
// import { cartContext } from "../Context/CartContextProvider";
// import toast from 'react-hot-toast';
// function ProductDetails() {
//   let {id,category}= useParams();
//   let [ product ,setProduct] =useState(null)
//   let [ relatedProducts ,setRelatedProducts] =useState(null)
//    let {addToCart,loading}=useContext(cartContext)
//   console.log(id);
//   var settings = {
//     dots: true,
//     infinite: false,
//     speed: 500,
//     slidesToShow: 5,
//     slidesToScroll: 1,
//     initialSlide: 0,
//     autoplay:true,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 3,
//           slidesToScroll: 3,
//           infinite: true,
//           dots: true
//         }
//       },
//       {
//         breakpoint: 600,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 2,
//           initialSlide: 2
//         }
//       },
//       {
//         breakpoint: 480,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1
//         }
//       }
//     ]
//   };
//   async function getProducts()
// {
//  let res=  await axios.get('https://ecommerce.routemisr.com/api/v1/products');
//  console.log(res.data.data);
//  let related=res.data.data.filter((products)=>products.category.name ==category)
// setRelatedProducts(related)
 
// }
//   async  function getProductDetails()
//     {
//       let res= await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
//       console.log(res.data.data);
//       setProduct(res.data.data);
//     }

//     useEffect(()=>{
//       getProductDetails()
//       getProducts()
//     },[id])
// async function addProductToCart(id) {
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
//     <Helmet><title>Product Details page</title></Helmet>
//    {product?<> <div className="w-[80%] mx-auto  grid grid-cols-[1fr_2fr] gap-5 items-center ">
//       <img className="w-full" src={product?.imageCover} alt="" />
//       <div>
//       <h2 className="text-green-400 text-sm mb-2">{product?.category.name}</h2>
//       <h3 className="mb-2">{product?.title.split(" ",2).join(" ")}</h3>
//    <p>{product?.description}</p>
//    {product?.priceAfterDiscount ? <div> <span className="text-red-600 line-through me-2 mb-2">{product?.price}</span>   <span>{product?.priceAfterDiscount} EGP</span></div> : <span>{product?.price} EGP</span>}


//     <div className="flex justify-between ">
//     <span><i className="fa-solid fa-star text-yellow-400 me-1" ></i>{product?.ratingsAverage}</span>
//     </div>

//     <button onClick={()=>addProductToCart(product._id)} className="cursor-pointer rounded-md border-[1px] p-1 w-full border-green-400 border-solid translate-y-20 group-hover:translate-y-0 hover:bg-green-500 hover:text-white transition-all"> {loading?<i className="fas fa-spinner fa-spin"></i> :<span><i className="fa-solid fa-cart-shopping me-2"></i> Add To Cart</span>}  </button>
//       </div>

      
//     </div> 

 
//     <div className="w-[80%] mx-auto  ">
//     <Slider {...settings} className="my-16 w-[90%] mx-auto ">
//     {
    
//     relatedProducts?.map((item)=> <div key={item._id} className=" ">
// <Link to={`/ProductDetails/${item._id}/${item.category.name}`}>
// <img className="" src={item.imageCover} alt={item.title} />
// <h2 className="text-green-400 text-sm mb-2">{item.category.name}</h2>
// <h3 className="mb-2 " >{item.title.split(" ",2).join(" ")}</h3>

// <div className="flex justify-between mb-2 me-5">
// {item.priceAfterDiscount ? <div> <span className="text-red-600 line-through me-2">{item.price}</span>   <span>{item.priceAfterDiscount} EGP</span></div> : <span>{item.price} EGP</span>}

// {
//   item.priceAfterDiscount?<span className="bg-red-600 text-white rounded-b-sm p-1 absolute top-0 left-1/2 -translate-x-1/2">sale</span> :null
// }
// <span><i className="fa-solid fa-star text-yellow-400 me-1" ></i>{item.ratingsAverage}</span>
// </div>
// </Link>

//  </div>)}
//     </Slider>
// </div> 
//     </> 
    
//     :<div className="h-dvh flex justify-center items-center"><ClipLoader color="#12ce61" /></div>} 


//     </>
// }





// export default ProductDetails
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ClipLoader from "react-spinners/esm/ClipLoader";
import Slider from "react-slick";
import { Helmet } from "react-helmet";
import { cartContext } from "../Context/CartContextProvider";
import toast from 'react-hot-toast';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function ProductDetails() {
  let { id, category } = useParams();
  let [product, setProduct] = useState(null);
  let [relatedProducts, setRelatedProducts] = useState(null);
  let { addToCart, loading } = useContext(cartContext);
  let [currentId, setCurrentId] = useState(null);

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    appendDots: (dots) => (
      <div>
        <ul className="flex justify-center gap-2">{dots}</ul>
      </div>
    ),
    customPaging: () => (
      <div className="w-3 h-3 bg-gray-400 rounded-full hover:bg-green-500 transition-all"></div>
    ),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  async function getProducts() {
    try {
      let res = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
      let related = res.data.data.filter((product) => product.category.name === category);
      setRelatedProducts(related);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  }

  async function getProductDetails() {
    try {
      let res = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
      setProduct(res.data.data);
    } catch (error) {
      console.error("Failed to fetch product details:", error);
    }
  }

  async function addProductToCart(id) {
    setCurrentId(id);
    let res = await addToCart(id);
    if (res.data) {
      toast.success('Product added to cart successfully');
    } else {
      toast.error('Failed to add product to cart');
    }
  }

  useEffect(() => {
    getProductDetails();
    getProducts();
  }, [id, category]);

  return (
    <>
      <Helmet>
        <title>Product Details</title>
      </Helmet>
      {product ? (
        <>
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4 sm:gap-6 items-center">
              <img
                className="w-full h-auto aspect-[3/2] object-contain rounded-lg"
                src={product?.imageCover || "https://placehold.co/400x267?text=No+Image"}
                alt={product?.title || "Product"}
                onError={(e) => {
                  e.target.src = "https://placehold.co/400x267?text=Error";
                  console.error("Failed to load product image:", product?.imageCover);
                }}
              />
              <div className="p-4">
                <h2 className="text-sm sm:text-base text-green-400 mb-2">
                  {product?.category.name}
                </h2>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                  {product?.title.split(" ", 2).join(" ")}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4">
                  {product?.description}
                </p>
                {product?.priceAfterDiscount ? (
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-red-600 line-through text-sm sm:text-base">
                      {product?.price}
                    </span>
                    <span className="text-gray-900 text-sm sm:text-base">
                      {product?.priceAfterDiscount} EGP
                    </span>
                  </div>
                ) : (
                  <span className="text-gray-900 text-sm sm:text-base mb-4 block">
                    {product?.price} EGP
                  </span>
                )}
                <div className="flex items-center mb-4">
                  <i className="fa-solid fa-star text-yellow-400 text-sm mr-1"></i>
                  <span className="text-sm sm:text-base">{product?.ratingsAverage}</span>
                </div>
                <button
                  onClick={() => addProductToCart(product._id)}
                  className="w-full px-4 py-2 text-sm sm:text-base text-green-700 border border-green-400 rounded-md hover:bg-green-500 hover:text-white hover:scale-105 transition-all"
                >
                  {loading && currentId === product._id ? (
                    <i className="fas fa-spinner fa-spin"></i>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <i className="fa-solid fa-cart-shopping"></i> Add To Cart
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>

          {relatedProducts?.length > 0 && (
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-6 text-center">
                Related Products
              </h3>
              <Slider {...settings} className="my-4">
                {relatedProducts.map((item) => (
                  <div key={item._id} className="px-2">
                    <Link to={`/ProductDetails/${item._id}/${item.category.name}`}>
                      <div className="relative bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:border-green-500 transition-all">
                        <img
                          className="w-full h-auto aspect-[3/2] object-contain rounded-t-lg"
                          src={item.imageCover || "https://placehold.co/300x200?text=No+Image"}
                          alt={item.title || "Related Product"}
                          onError={(e) => {
                            e.target.src = "https://placehold.co/300x200?text=Error";
                            console.error("Failed to load related product image:", item.imageCover);
                          }}
                        />
                        <div className="p-4">
                          <h2 className="text-sm sm:text-base text-green-400 mb-2">
                            {item.category.name}
                          </h2>
                          <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">
                            {item.title.split(" ", 2).join(" ")}
                          </h3>
                          <div className="flex justify-between items-center">
                            {item.priceAfterDiscount ? (
                              <div className="flex items-center gap-2">
                                <span className="text-red-600 line-through text-sm sm:text-base">
                                  {item.price}
                                </span>
                                <span className="text-gray-900 text-sm sm:text-base">
                                  {item.priceAfterDiscount} EGP
                                </span>
                              </div>
                            ) : (
                              <span className="text-gray-900 text-sm sm:text-base">
                                {item.price} EGP
                              </span>
                            )}
                            <div className="flex items-center">
                              <i className="fa-solid fa-star text-yellow-400 text-sm mr-1"></i>
                              <span className="text-sm sm:text-base">{item.ratingsAverage}</span>
                            </div>
                          </div>
                        </div>
                        {item.priceAfterDiscount && (
                          <span className="absolute top-2 left-2 bg-red-600 text-white text-xs sm:text-sm px-2 py-1 rounded">
                            Sale
                          </span>
                        )}
                      </div>
                    </Link>
                  </div>
                ))}
              </Slider>
            </div>
          )}
        </>
      ) : (
        <div className="min-h-screen flex justify-center items-center">
          <ClipLoader color="#12ce61" />
        </div>
      )}
    </>
  );
}

export default ProductDetails;