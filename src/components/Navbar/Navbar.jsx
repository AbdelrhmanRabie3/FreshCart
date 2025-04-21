// import style from "./Navbar.module.css"
// import logo from "../../assets/images/freshcart-logo.svg"
// import { Link, useNavigate } from 'react-router-dom';
// import { useContext, useEffect, useState } from 'react';
// import { Authcontext } from '../Context/AuthContextProvider';
// import { cartContext } from '../Context/CartContextProvider';

// function Navbar() {
//     const [isOpen, setIsOpen] = useState(false);
// let {numberOfCartItems}=useContext(cartContext)
//     let {token,setToken}= useContext(Authcontext);
//     let navigate=useNavigate();
//     function LogOut()
//     {
        
//         localStorage.removeItem('token');
//         setToken(null);
//         navigate('/Login');
//     }

 
//     return <>
//     <nav className="py-3 bg-gray-100 px-4 fixed top-0 left-0 right-0 z-50 shadow-md ">
//       <div className="container mx-auto flex justify-between items-center   w-full px-4 md:px-8">

//         <div className="flex items-center gap-4">
//           <img src={logo} alt="Logo" className="h-8" />
//           {token && (
//             <ul className="hidden md:flex gap-4 text-gray-600">
//               <Link className=" hover:text-green-500 transition" to="/"><li>Home</li></Link>
//               <Link className=" hover:text-green-500 transition" to="/Products"><li>Products</li></Link>
//               <Link  className=" hover:text-green-500 transition" to="/Categories"><li>Categories</li></Link>
//               <Link className=" hover:text-green-500 transition" to="/Brands"><li>Brands</li></Link>
//               <Link className=" hover:text-green-500 transition" to="/WishList"><li>WishList</li></Link>
//             </ul>
//           )}
//         </div>
//         <div className="flex gap-4">
//           <ul className="flex gap-2 text-lg">
//             <span><i className="fab fa-facebook"></i></span>
//             <span><i className="fab fa-twitter"></i></span>
//             <span><i className="fab fa-instagram"></i></span>
//             <span><i className="fab fa-tiktok"></i></span>
//             <span><i className="fab fa-linkedin"></i></span>
//             <span><i className="fab fa-youtube"></i></span>
//           </ul>
//           <ul className="flex gap-2 items-center">
//             {token ? (
//               <div className="flex gap-4 items-center">
//                 <div className="relative">
//                   <Link to="/Cart"><i className="fa-solid fa-cart-shopping text-xl"></i></Link>
//                   <span className="absolute -top-2 left-2 rounded-lg px-1 text-xs text-white bg-green-500">
//                     {numberOfCartItems}
//                   </span>
//                 </div>
//                 <li onClick={LogOut} className="cursor-pointer text-gray-700 hover:text-red-500 transition">
//                   Logout
//                 </li>
//               </div>
//             ) : (
//               <>
//                 <Link to="/Login" className="text-gray-700 hover:text-green-500 transition">Login</Link>
//                 <Link to="/Register" className="text-gray-700 hover:text-green-500 transition">Register</Link>
//               </>
//             )}
//           </ul>
//         </div>
//         <button 
//           onClick={() => setIsOpen(!isOpen)}
//           className="md:hidden text-gray-700 text-2xl p-2"
//         >
//           <i className="fa-solid fa-bars"></i>
//         </button>
//       </div>
//       {isOpen && token && (
//         <div className="md:hidden bg-gray-100 mt-2 p-4 rounded-lg">
//           <ul className="flex flex-col gap-2 text-gray-700">
//             <Link className=" hover:text-green-500 transition" to="/"><li>Home</li></Link>
//             <Link className=" hover:text-green-500 transition" to="/Products"><li>Products</li></Link>
//             <Link className=" hover:text-green-500 transition" to="/Categories"><li>Categories</li></Link>
//             <Link className=" hover:text-green-500 transition" to="/Brands"><li>Brands</li></Link>
//             <Link className=" hover:text-green-500 transition" to="/WishList"><li>WishList</li></Link>
//           </ul>
//         </div>
//       )}
//     </nav>




//     {/* <nav className="py-3 bg-gray-100  px-2 fixed top-0 left-0 right-0 z-50">
//     <div className="container w-5/6 mx-auto flex justify-between">
//         <div className="links flex gap-2.5 items-center">
//         <img src={logo} alt="" />
//         {token?<ul className="flex gap-2 text-gray-600">
//             <Link to=""><li>Home</li></Link>
//             <Link to="Products"><li>Products</li></Link>
//             <Link to="Categories"> <li>Categories</li></Link>
//             <Link to="Brands"><li>Brands</li></Link>
//             <Link to="WishList"><li>WishList</li></Link>
 
//             </ul> :null}
        
//         </div>

// <div className="social flex  gap-4">
// <ul className="flex gap-4">
//             <span><i className="fab fa-facebook"></i></span>
//             <span><i className="fab fa-twitter"></i></span>
//             <span><i className="fab fa-instagram"></i></span>
//             <span><i className="fab fa-tiktok"></i></span>
//             <span><i className="fab fa-linkedin"></i></span>
//             <span><i className="fab fa-youtube"></i></span>
//         </ul>
// <ul className="flex  gap-2">
        

//         {token?<div className="flex gap-4">
//            <div className="relative ">
//            <Link to="Cart"><i className="fa-solid fa-cart-shopping "></i></Link>
//             <span className="absolute -top-2 left-2 rounded-lg px-1 text-[12px] text-white bg-green-500">{numberOfCartItems}</span></div>
//             <li onClick={LogOut} className="cursor-pointer"><span>Logout</span></li> 
//         </div>
//         :<>
//             <Link to="Login">Login</Link>
//             <Link className="" to="Register">Register</Link>
//         </>}
        
// </ul>
        

// </div>
        
// </div>
//     </nav> */}
   

//     </>
// }

// export default Navbar
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { Authcontext } from '../Context/AuthContextProvider';
import { cartContext } from '../Context/CartContextProvider';
import { Helmet } from 'react-helmet';
import logo from '../../assets/images/freshcart-logo.svg';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  let { numberOfCartItems } = useContext(cartContext);
  let { token, setToken } = useContext(Authcontext);
  let navigate = useNavigate();

  function LogOut() {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/Login');
  }

  return (
    <>
      <nav className="py-3 bg-gray-100 fixed top-0 left-0 right-0 z-50 shadow-md">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
          <div className="flex items-center gap-4 sm:gap-6">
            <img
              src={logo}
              alt="FreshCart Logo"
              className="h-8 sm:h-10 w-auto"
              onError={(e) => {
                e.target.src = 'https://placehold.co/100x40?text=Logo';
                console.error('Failed to load logo');
              }}
            />
            {token && (
              <ul className="hidden md:flex gap-4 sm:gap-6 text-sm sm:text-base text-gray-600">
                <li>
                  <Link className="hover:text-green-500 transition-all" to="/">
                    Home
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-green-500 transition-all" to="/Products">
                    Products
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-green-500 transition-all" to="/Categories">
                    Categories
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-green-500 transition-all" to="/Brands">
                    Brands
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-green-500 transition-all" to="/WishList">
                    WishList
                  </Link>
                </li>
              </ul>
            )}
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <ul className="flex gap-2 sm:gap-3 text-lg sm:text-xl text-gray-700">
              <li className="hover:scale-110 transition-all">
                <i className="fab fa-facebook"></i>
              </li>
              <li className="hover:scale-110 transition-all">
                <i className="fab fa-twitter"></i>
              </li>
              <li className="hover:scale-110 transition-all">
                <i className="fab fa-instagram"></i>
              </li>
              <li className="hover:scale-110 transition-all">
                <i className="fab fa-tiktok"></i>
              </li>
              <li className="hover:scale-110 transition-all">
                <i className="fab fa-linkedin"></i>
              </li>
              <li className="hover:scale-110 transition-all">
                <i className="fab fa-youtube"></i>
              </li>
            </ul>

            <ul className="flex items-center gap-2 sm:gap-4 text-sm sm:text-base">
              {token ? (
                <div className="flex items-center gap-2 sm:gap-4">
                  <div className="relative">
                    <Link to="/Cart">
                      <i className="fa-solid fa-cart-shopping text-lg sm:text-xl hover:text-green-500 transition-all"></i>
                    </Link>
                    {numberOfCartItems > 0 && (
                      <span className="absolute -top-2 -right-2 rounded-full px-1.5 py-0.5 text-xs text-white bg-green-500">
                        {numberOfCartItems}
                      </span>
                    )}
                  </div>
                  <li
                    onClick={LogOut}
                    className="cursor-pointer text-gray-700 hover:text-red-500 transition-all"
                  >
                    Logout
                  </li>
                </div>
              ) : (
                <>
                  <li>
                    <Link className="text-gray-700 hover:text-green-500 transition-all" to="/Login">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link className="text-gray-700 hover:text-green-500 transition-all" to="/Register">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-gray-700 text-2xl p-2 hover:bg-gray-200 rounded-full transition-all"
            >
              <i className="fa-solid fa-bars"></i>
            </button>
          </div>
        </div>

        {isOpen && token && (
          <div className="md:hidden bg-gray-100 mt-2 mx-4 p-4 rounded-lg shadow-md">
            <ul className="flex flex-col gap-3 text-sm sm:text-base text-gray-700">
              <li>
                <Link
                  className="block py-1 hover:text-green-500 transition-all"
                  to="/"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className="block py-1 hover:text-green-500 transition-all"
                  to="/Products"
                  onClick={() => setIsOpen(false)}
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  className="block py-1 hover:text-green-500 transition-all"
                  to="/Categories"
                  onClick={() => setIsOpen(false)}
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  className="block py-1 hover:text-green-500 transition-all"
                  to="/Brands"
                  onClick={() => setIsOpen(false)}
                >
                  Brands
                </Link>
              </li>
              <li>
                <Link
                  className="block py-1 hover:text-green-500 transition-all"
                  to="/WishList"
                  onClick={() => setIsOpen(false)}
                >
                  WishList
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;