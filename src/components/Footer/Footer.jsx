import { Helmet } from "react-helmet";

function Footer() {
  return (
    <>
      <footer className="py-8 sm:py-12 bg-gray-100">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-lg sm:text-xl font-semibold mb-2">
            Get the FreshCart app
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mb-4">
            We will send you a link, open it on your phone to download the app
          </p>

          <form>
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
              <input
                type="email"
                id="Email"
                className="w-full sm:flex-1 px-4 py-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Email"
              />
              <button
                type="button"
                className="w-full sm:w-auto px-6 py-2.5 text-sm sm:text-base font-medium text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 rounded-lg transition-all"
              >
                Share app link
              </button>
            </div>

            <div className="py-4 border-t border-b border-gray-300">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <h3 className="text-sm sm:text-base font-medium">
                    Payments partners
                  </h3>
                  <div className="flex gap-3">
                    <span className="text-2xl sm:text-3xl text-gray-700 hover:scale-105 transition-all">
                      <i className="fa-brands fa-amazon-pay"></i>
                    </span>
                    <span className="text-2xl sm:text-3xl text-gray-700 hover:scale-105 transition-all">
                      <i className="fa-brands fa-cc-visa"></i>
                    </span>
                    <span className="text-2xl sm:text-3xl text-gray-700 hover:scale-105 transition-all">
                      <i className="fa-brands fa-cc-mastercard"></i>
                    </span>
                    <span className="text-2xl sm:text-3xl text-gray-700 hover:scale-105 transition-all">
                      <i className="fa-brands fa-paypal"></i>
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <h3 className="text-sm sm:text-base font-medium">
                    Get deliveries with FreshCart
                  </h3>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex items-center bg-black text-white rounded-lg p-2 hover:scale-105 transition-all">
                      <span className="text-2xl sm:text-3xl mr-2">
                        <i className="fa-brands fa-apple"></i>
                      </span>
                      <div>
                        <p className="text-xs">Available on the</p>
                        <h4 className="text-sm sm:text-base font-semibold">
                          App Store
                        </h4>
                      </div>
                    </div>
                    <div className="flex items-center bg-black text-white rounded-lg p-2 hover:scale-105 transition-all">
                      <span className="text-2xl sm:text-3xl mr-2">
                        <i className="fa-solid fa-play"></i>
                      </span>
                      <div>
                        <p className="text-xs">Get it on</p>
                        <h4 className="text-sm sm:text-base font-semibold">
                          Google Play
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </footer>
    </>
  );
}

export default Footer;