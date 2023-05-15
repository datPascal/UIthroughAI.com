import { Link } from "@remix-run/react";
import { useOptionalUser } from "~/utils";

const HEROTEXTLEFT = () => {
    const user = useOptionalUser(); 
  
    return (
        <section className="text-gray-600 body-font">
          <div className="container mx-auto flex px-5 py-12 md:py-24 md:flex-row flex-col items-center">
            <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-8 md:mb-0 items-center text-center">
              <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Introducing the Future of Data Analysis</h1>
              <div>
                <p className="text-gray-600 mb-2 leading-relaxed">Our advanced AI-powered platform understands your data needs and effortlessly crafts the perfect query for you.</p>
                <p className="text-gray-600 mb-8 leading-relaxed">All you need to do is type what you're looking for!</p>
              </div>
              <div className="flex w-full md:justify-start justify-center items-end">
              {user ? (
                  <Link
                    to="/Queries"
                    className="items-center justify-center inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                  >
                    Get to your Workspace {user.email}
                  </Link>
                ) : (
                  <div className="space-y-4 sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
                    <Link
                      to="/join"
                      className="items-center justify-center inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                    >
                      Try it out for free
                    </Link>
                    <Link
                      to="/login"
                      className="items-center justify-center ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg"
                    >
                      Log In
                    </Link>
                  </div>
                )}
              </div>
            </div>
            <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
              
              <img className="object-cover object-center rounded" alt="A example of a person typing plain English queries and getting complex SQL results in seconds with the help of AI" 
              src={require("./../assets/GiveMeNameAndAdressExample1200x1000.png")}/>
            </div>
          </div>
        </section>
    );
  };
  
  export default HEROTEXTLEFT;


