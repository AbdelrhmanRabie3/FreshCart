import style from "./Brands.module.css"
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ClipLoader from "react-spinners/esm/ClipLoader";
import Error from '../Error/Error';
import { Helmet } from "react-helmet";
function Brands() {
  async  function getBrands()
    {
     return await axios.get("https://ecommerce.routemisr.com/api/v1/brands")
    }
    let{data, isError,isLoading,error}=  useQuery({
        queryKey:["Brands"], 
        queryFn:getBrands,
    })

   if(isLoading)
   {
    return <div className="h-dvh flex justify-center items-center"><ClipLoader color="#12ce61" /></div>
   }
    
   if (error) {
    return <Error/>
    
   }
    return <>
    <Helmet><title>Brands page</title></Helmet>
    {
        data? <div className="w-[80%] mx-auto grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 gap-5 py-15">
            {data?.data.data.map((brand)=> <div className="cursor-pointer" key={brand._id}>
                <img src={brand.image} alt={brand.name} />
            </div>)
            }
         </div>:null
    }
    </>
}

export default Brands
