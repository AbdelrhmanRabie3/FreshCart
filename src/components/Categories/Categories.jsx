// import { Helmet } from "react-helmet"
// import style from "./Categories.module.css"
// import axios from "axios"
// import { useEffect, useState } from "react";
// import ClipLoader from "react-spinners/esm/ClipLoader";
// function Categories() {
//    let [allCategories,setAllCategories] =useState(null)
//    let [subCategory,setSubCategory]=useState(null)
//    let [clickedSubCategory,setClickedSubCategory]=useState(null)
//    let [isLoading,setIsLoading]=useState(false)
//    async function getAllCategories()
//     {setIsLoading(true)
//         try {
//         let res=await  axios.get("https://ecommerce.routemisr.com/api/v1/categories")
//         console.log(res.data.data);
//         setAllCategories(res.data.data)
//         setIsLoading(false)
//     } catch (error) {
//         console.log(error);
//         setIsLoading(false)
//     }
     
//     }
//    async function getSubCategory(categoryId,name) {
    
//      try {
//         let res=await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`)
//         console.log(res?.data.data);
//         setSubCategory(res.data.data)
//         setClickedSubCategory(name)
        
//      } catch (error) {
//         console.log(error);
        
//      }  
//     }
//     useEffect(()=>{
//         getAllCategories()
//     },[])
//     return <>
//     <Helmet><title>Categories page</title></Helmet>
//     {isLoading?<div className="h-dvh flex justify-center items-center"><ClipLoader color="#12ce61" /></div>:<>
//         <div className="w-[80%] mx-auto grid lg:grid-cols-3 md:grid-cols-4 sm:grid-cols-2 gap-5 py-16">
//     {allCategories?.map((category)=><div onClick={()=>getSubCategory(category._id,category.name)} key={category._id} className="max-w-sm cursor-pointer hover:scale-105 transition-all bg-white border border-gray-200 rounded-lg shadow-sm  hover:shadow-green-100 hover:shadow-md hover:border-green-500 dark:bg-gray-800 dark:border-gray-700">
//         <img className="rounded-t-lg w-full h-[250px] object-cover" src={category.image} alt={category.name} />
//     <div className="p-5">
        
//      <h5 className="mb-2 text-2xl text-green-500 font-bold tracking-tight text-center  dark:text-white">{category.name}</h5>
//     </div>
// </div>
// )}
//     </div>

//     {subCategory? <div>
//         <h4 className="text-center text-2xl my-5 text-green-500 font-bold">{clickedSubCategory} sub categories</h4>
//         <div className="w-[80%] mx-auto grid lg:grid-cols-3 md:grid-cols-4 sm:grid-cols-2 gap-5 py-16">{subCategory?.map((subCat)=><div key={subCat._id} className="max-w-sm p-6 cursor-pointer hover:scale-105 transition-all bg-white border border-gray-200 rounded-lg shadow-sm  hover:shadow-green-100 hover:shadow-md hover:border-green-500 dark:bg-gray-800 dark:border-gray-700 ">{subCat.name}</div>)}</div>
//     </div>:null
//     }
//     </>}
    
//     </>
// }

// export default Categories
import { Helmet } from "react-helmet";
import axios from "axios";
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/esm/ClipLoader";

function Categories() {
  let [allCategories, setAllCategories] = useState(null);
  let [subCategory, setSubCategory] = useState(null);
  let [clickedSubCategory, setClickedSubCategory] = useState(null);
  let [isLoading, setIsLoading] = useState(false);

  async function getAllCategories() {
    setIsLoading(true);
    try {
      let res = await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
      console.log(res.data.data);
      setAllCategories(res.data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  async function getSubCategory(categoryId, name) {
    try {
      let res = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`
      );
      console.log(res?.data.data);
      setSubCategory(res.data.data);
      setClickedSubCategory(name);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <>
      <Helmet>
        <title>Categories page</title>
      </Helmet>
      {isLoading ? (
        <div className="min-h-screen flex justify-center items-center">
          <ClipLoader color="#12ce61" />
        </div>
      ) : (
        <>
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {allCategories?.map((category) => (
                <div
                  key={category._id}
                  onClick={() => getSubCategory(category._id, category.name)}
                  className="cursor-pointer bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:shadow-green-100 hover:border-green-500 hover:scale-105 transition-all"
                >
                  <img
                    className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-t-lg"
                    src={category.image || "https://placehold.co/300x200?text=No+Image"}
                    alt={category.name || "Category"}
                    onError={(e) => {
                      e.target.src = "https://placehold.co/300x200?text=Error";
                      console.error("Failed to load category image:", category.image);
                    }}
                  />
                  <div className="p-4">
                    <h5 className="text-lg sm:text-xl font-bold text-green-500 text-center">
                      {category.name}
                    </h5>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {subCategory && (
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
              <h4 className="text-center text-xl sm:text-2xl font-bold text-green-500 mb-6">
                {clickedSubCategory} sub categories
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {subCategory?.map((subCat) => (
                  <div
                    key={subCat._id}
                    className="cursor-pointer bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:shadow-green-100 hover:border-green-500 hover:scale-105 transition-all p-6 text-center"
                  >
                    <h5 className="text-base sm:text-lg font-medium text-gray-900">
                      {subCat.name}
                    </h5>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default Categories;