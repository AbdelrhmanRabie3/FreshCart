import axios from "axios";
import style from "./CategorySlider.module.css"
import Slider from "react-slick";
import { useEffect, useState } from "react";
function CategorySlider() {
    let [category,setCategory]=useState(null)
  async  function getCategories()
    {
    let res=  await  axios.get("https://ecommerce.routemisr.com/api/v1/categories");
    console.log(res.data.data);
    setCategory(res.data.data)
    
    
    }
    useEffect(()=>{
        getCategories()
    },[])
  
    let settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 1,
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
    return <>
   <Slider {...settings} className="mt-16 w-[80%] mx-auto">
      {category?.map((item)=> <div key={item._id}> 
        <div>
        <img className="w-full h-[200px] object-cover" src={item.image} alt={item.name} />
        <h4 className="mt-2 text-center text-xl">{item.name}</h4>
      </div>
      </div>)}
    </Slider>
    </>
}

export default CategorySlider
