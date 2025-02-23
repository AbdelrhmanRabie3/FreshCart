import style from "./Footer.module.css"
function Footer() {
    return <>
   <footer className="py-10 bg-gray-100  ">
    <div className="container w-5/6 mx-auto">
    <h2 className="mb-2">Get the FreshCart app</h2>
    <p className="mb-2">We will send you a link, open it on your phone to download the app</p>

    <form action="">
    <div className="input-mail flex items-center justify-between mb-3"  >
         <div className=" w-5/6 mt-2" >
         <input type="Email" id="Email" className= " px-5 py-2.5 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email"     />
        </div>
        <button type="button" className="cursor-pointer mt-4 self-end focus:outline-none text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-10 py-2.5 me-2 mb-2 dark:bg-green-500 dark:hover:bg-green-700 dark:focus:ring-green-800">Share app link</button>
            </div>  

<div className="footer-container mt-3  py-4 border-t-1 border-b-1 border-gray-300 flex justify-between items-center">
<div className="payments flex items-center gap-2 ">
                <h3 className="">Payments partners </h3>
                <div className="payments icons flex gap-2">
                    <span><i className="fa-brands fa-amazon-pay"></i></span>
                    <span><i className="fa-brands fa-cc-visa"></i></span>
                    <span><i className="fa-brands fa-cc-mastercard"></i></span>
                    <span><i className="fa-brands fa-paypal"></i></span>
                </div>
</div>
<div className="store flex items-center gap-2">
    <h3>Get deliveries with FreshCart</h3>

    <div className="stores-icon flex  gap-2">
        <div className="app-store flex  gap-3 bg-black items-center rounded-lg p-1">
            <span><i className="fa-brands fa-apple text-white text-2xl"></i></span>
            <div className="get-link text-white  ">
                <p>Available on the</p>
                <h4 className="text-xl">App store</h4>
            </div>
        </div>
        <div className="app-store flex  gap-3 bg-black items-center rounded-lg p-1">
            <span><i className="fa-solid fa-play  text-white text-2xl"></i></span>
            <div className="get-link text-white  ">
                <p>Get it ON</p>
                <h4 className="text-xl">Google play</h4>
            </div>
        </div>
    </div>
</div>
</div>

            
    </form>
    </div>

   </footer>
    </>
}

export default Footer
