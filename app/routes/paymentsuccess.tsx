import { Link } from "@remix-run/react";

const PAYMENTSUCCESS = () => {
  
    return (
        <section className="h-full text-gray-600 bg-white body-font overflow-hidden">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-col text-center mb-20 ">
              <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">You're a PRO now!</h1>
              <p className="text-gray-600 mb-8">Reach out to us if you need something.</p>
              <div className="flex items-center justify-center">
                    <Link
                    to="/queries"
                    className="w-1/4 rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-violet-700 shadow-sm hover:bg-violet-50 sm:px-8"
                    >
                    Lets get to work.
                    </Link>
              </div>
            </div>
          </div>
        </section>
    );
  };
  
  export default PAYMENTSUCCESS;