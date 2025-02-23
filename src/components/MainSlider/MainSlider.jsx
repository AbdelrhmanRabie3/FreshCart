import style from "./MainSlider.module.css"
import img1 from "../../assets/images/grocery-banner.png"
import img2 from "../../assets/images/grocery-banner-2.jpeg"
import slider1 from "../../assets/images/slider-image-1.jpeg"
import slider2 from "../../assets/images/slider-image-2.jpeg"
import slider3 from "../../assets/images/slider-image-3.jpeg"
import Slider from "react-slick";
function MainSlider() {
    let settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay:true,
        
      };
    return <>
   <div className="grid grid-cols-[2fr_1fr] mx-auto w-[80%] my-16">
    <div className="overflow-hidden ">
    <Slider {...settings} className="my-10">
      <div>
        <img className="w-full h-[400px]" src={slider1} alt="" />
      </div>
      <div>
        <img className="w-full h-[400px]"  src={slider2} alt="" />
      </div>
      <div>
        <img className="w-full h-[400px]" src={slider3} alt="" />
      </div>
    </Slider>
    </div>
    <div className="my-10">
        <img className="h-[200px]" src={img1} alt="" />
        <img className="h-[200px]" src={img2} alt="" />
    </div>
   </div>
    </>
}

export default MainSlider
