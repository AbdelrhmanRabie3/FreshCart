// import axios from "axios";
// import { useContext, useEffect, useState } from "react";
// import { cartContext } from "../Context/CartContextProvider";
// import { Helmet } from "react-helmet";
// import { jwtDecode } from "jwt-decode";
// import { useQuery } from "@tanstack/react-query";
// import ClipLoader from "react-spinners/esm/ClipLoader";

// function AllOrders() {
//   const { id } = jwtDecode(localStorage.getItem("token"));

//   async function getUserOrders() {
//     let res = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`);
//     return res;
//   }

//   let { data, error, isError, isLoading } = useQuery({
//     queryKey: ["userOrders"],
//     queryFn: getUserOrders,
//     refetchInterval: 60000,
//   });

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex justify-center items-center">
//         <ClipLoader color="#12ce61" />
//       </div>
//     );
//   }

//   return (
//     <>
//       <Helmet>
//         <title>AllOrders page</title>
//       </Helmet>
//       <div className="py-8 px-4 sm:py-16 sm:px-6 w-full max-w-7xl mx-auto">
//         {data.data?.map((order) => (
//           <div key={order._id} className="p-4 sm:p-6 mb-4 bg-slate-100 rounded-lg shadow-md">
//             <h2 className="text-base sm:text-lg font-medium">
//               Total order price: <span className="text-green-400">{order.totalOrderPrice} EGB</span>
//             </h2>
//             <h2 className="text-base sm:text-lg">
//               Order payment method: <span className="font-medium">{order.paymentMethodType}</span>
//             </h2>
//             <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4">
//               {order.cartItems.map((item) => (
//                 <div key={item._id} className="w-full sm:w-1/2 md:w-1/4 lg:w-1/6 p-2">
//                   <img
//                     className="w-full h-auto object-cover rounded"
//                     src={item.product.imageCover}
//                     alt={item.product.title || "Product"}
//                   />
//                 </div>
//               ))}
//             </div>
//             <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-2">
//               <h4 className="text-sm sm:text-base">
//                 {order.isDelivered === false ? (
//                   <span className="text-red-400">Not delivered yet</span>
//                 ) : (
//                   <span className="text-blue-400">Delivered</span>
//                 )}
//               </h4>
//               <h4 className="text-sm sm:text-base">
//                 {order.isPaid === false ? (
//                   <span className="text-red-400">Cash on delivery</span>
//                 ) : (
//                   <span className="text-blue-400">
//                     Payment done <i className="fa-solid fa-check"></i>
//                   </span>
//                 )}
//               </h4>
//             </div>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// }

// export default AllOrders;
import axios from "axios";
import { useContext, useEffect } from "react";
import { cartContext } from "../Context/CartContextProvider";
import { Helmet } from "react-helmet";
import { jwtDecode } from "jwt-decode";
import { useQuery } from "@tanstack/react-query";
import ClipLoader from "react-spinners/esm/ClipLoader";

function AllOrders() {
  const { id } = jwtDecode(localStorage.getItem("token"));

  async function getUserOrders() {
    const res = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`);
    return res;
  }

  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["userOrders"],
    queryFn: getUserOrders,
    refetchInterval: 60000,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <ClipLoader color="#12ce61" size={50} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-center p-4 bg-red-100 text-red-700 rounded-md">
          <p className="text-lg font-medium">Failed to load orders</p>
          <p className="text-sm">{error.message || "An error occurred while fetching your orders."}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>All Orders</title>
      </Helmet>
      <section className="min-h-screen px-4 sm:px-6 py-8 sm:py-12">
        <div className="w-full max-w-7xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6">
            Your Orders
          </h2>
          {data.data?.length === 0 ? (
            <div className="flex justify-center items-center h-[50vh]">
              <p className="text-lg text-gray-600">No orders found</p>
            </div>
          ) : (
            data.data?.map((order) => (
              <div
                key={order._id}
                className="p-4 sm:p-6 mb-4 bg-gray-50 rounded-lg shadow-md border border-gray-200"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
                  <h2 className="text-base sm:text-lg font-medium text-gray-900">
                    Total order price:{" "}
                    <span className="text-green-600">{order.totalOrderPrice} EGP</span>
                  </h2>
                  <h2 className="text-base sm:text-lg font-medium text-gray-900">
                    Payment method: <span className="font-semibold">{order.paymentMethodType}</span>
                  </h2>
                </div>
                {order.createdAt && (
                  <p className="text-sm text-gray-500 mb-4">
                    Ordered on: {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                )}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {order.cartItems.map((item) => (
                    <div key={item._id} className="text-center">
                      <img
                        className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded mx-auto"
                        src={item.product.imageCover || "https://via.placeholder.com/96"}
                        alt={item.product.title || "Product"}
                        onError={(e) => (e.target.src = "https://via.placeholder.com/96")}
                      />
                    </div>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-2">
                  <h4 className="text-sm sm:text-base">
                    {order.isDelivered === false ? (
                      <span className="text-red-600">Not delivered yet</span>
                    ) : (
                      <span className="text-blue-600">Delivered</span>
                    )}
                  </h4>
                  <h4 className="text-sm sm:text-base">
                    {order.isPaid === false ? (
                      <span className="text-red-600">Cash on delivery</span>
                    ) : (
                      <span className="text-blue-600">
                        Payment done <i className="fa-solid fa-check ml-1"></i>
                      </span>
                    )}
                  </h4>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </>
  );
}

export default AllOrders;