
import style from "./Layout.module.css"
import { Outlet } from 'react-router-dom';
import Navbar from './../Navbar/Navbar';
import Footer from './../Footer/Footer';
function Layout() {
    return <>
<Navbar/>
<div className="mt-12 sm:mt-16"><Outlet /></div>
<Footer/>
    </>
}

export default Layout
