import style from "./Home.module.css"
import DisplayProduct from './../DisplayProduct/DisplayProduct';
import CategorySlider from "../CategorySlider/CategorySlider";
import MainSlider from "../MainSlider/MainSlider";
import { Helmet } from "react-helmet";

function Home() {
    
    return <>
    <Helmet><title>E commerce</title></Helmet>
    <MainSlider/>
    <CategorySlider/>
    <DisplayProduct/>
    </>
}

export default Home
