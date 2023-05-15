  import type { MetaFunction } from "@remix-run/node";
  import FAQ from "./faq";
  import FOOTER from "./footer";
  import { Link } from "@remix-run/react";
  import { useOptionalUser } from "~/utils";
  import HEADERBEFORELOGIN from "./headerBeforeLogin";


  export const meta: MetaFunction = () => {
    return { title: "Database Menu SQLtroughAI" };
  };

  export default function MainscreenCustomer() {
    const user = useOptionalUser(); 
 
    return (
      <div className="relative min-h-screen bg-white">

        <HEADERBEFORELOGIN />

        
        <section className="text-gray-600 body-font">
          <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
            <div className="lg:w-full md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-8 md:mb-0 items-center text-center">
              <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Setup Made Easy.</h1>
              <div>
                <p className="mb-2 leading-relaxed">To begin, simply click on "Add Database.</p>
                <p className="leading-relaxed">Simply add a database by uploading a .csv or Excel file, </p>
                <p className="mb-2 leading-relaxed">Or inputting the columns and data types manually.</p>
                <p className="mb-8 leading-relaxed">Rest assured, we don't store the contents of your .csv or Excel file.</p>
              </div>
              <div className="flex w-full md:justify-start justify-center items-end">
              {user ? (
                  <Link
                    to="/Queries"
                    className="items-center justify-center ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg"
                  >
                    Get to your Workspace {user.email}
                  </Link>
                ) : (
                  <div className="space-y-4 sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
                    <Link
                      to="/join"
                      className="items-center justify-center ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg"
                    >
                      Try it out for free
                    </Link>
                  </div>
                )}
              </div>
            </div>
            <div className="lg:max-w-full lg:w-full md:w-1/2 w-3/6 pl-10">
              
              <img className="object-cover object-center rounded" alt="A example of a person typing plain English queries and getting complex SQL results in seconds with the help of AI" 
              src={require("./../assets/CreateDatabase.png")}/>
            </div>
          </div>
        </section>

        <section className="text-gray-600 body-font">
          <div className="container mx-auto flex px-5 py-18 md:flex-row flex-col items-center">
            <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-8 md:mb-0">
              <img className="object-cover object-center rounded" alt="A web app that uses AI to create SQL queries with joins from plain English sentences. Example: join customers and orders tables where order date is after 2020." 
                src={require("./../assets/EditDatabase.png")}/>
            </div>
            <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
              <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Editing Made Effortless.</h1>
              <p className="mb-2 leading-relaxed">To start, just click on a Database in the Database Menu.</p>
              <p className="mb-2 leading-relaxed">Seamlessly add, change, or delete columns with just a few clicks.</p>
              <p className="mb-2 leading-relaxed">Easily add another database, or delete existing databases as needed.</p>
              <p className="mb-8 leading-relaxed">Don't worry, we ensure the security and privacy of your data while editing.</p>

              <div className="flex w-full md:justify-start justify-center items-end">
              {user ? (
                  <Link
                    to="/Queries"
                    className="items-center justify-center ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg"
                  >
                    Get to your Workspace {user.email}
                  </Link>
                ) : (
                  <div className="space-y-4 sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
                    <Link
                      to="/join"
                      className="items-center justify-center ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg"
                    >
                      14 Day trial. No credit card required.
                    </Link>
                  </div>
                )}
              </div>
            </div>
            
          </div>
        </section>

        <FAQ />
        <FOOTER />

      </div>
    );
  }

  function Header() {
    return (
      <header className="flex items-center bg-white p-4 text-gray-900">
        <h1 className="text-3xl font-bold">
          <Link to="/.">SQLtroughAI</Link>
        </h1>
      </header>
    );
  }