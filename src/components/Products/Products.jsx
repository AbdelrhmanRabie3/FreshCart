import style from "./Products.module.css"
import DisplayProduct from './../DisplayProduct/DisplayProduct';
import { Helmet } from "react-helmet";
function Products() {
    return <>
    <Helmet><title>Products page</title></Helmet>
  <DisplayProduct/>
    </>
}

export default Products
