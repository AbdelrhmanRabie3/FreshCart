import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ClipLoader from "react-spinners/esm/ClipLoader";
import Error from '../Error/Error';
import { Helmet } from "react-helmet";

function Brands() {
  async function getBrands() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }

  let { data, isError, isLoading, error } = useQuery({
    queryKey: ["Brands"],
    queryFn: getBrands,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <ClipLoader color="#12ce61" />
      </div>
    );
  }

  if (isError) {
    return <Error />;
  }

  return (
    <>
      <Helmet>
        <title>Brands page</title>
      </Helmet>
      {data ? (
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 py-8 sm:py-16 px-4 sm:px-6">
          {data?.data.data.map((brand) => (
            <div
              key={brand._id}
              className="cursor-pointer transform transition duration-300 hover:scale-105"
            >
              <img
                src={brand.image}
                alt={brand.name}
                className="w-full h-32 sm:h-40 object-cover rounded-lg shadow-md"
              />
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
}

export default Brands;