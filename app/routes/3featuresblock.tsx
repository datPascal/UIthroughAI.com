import { Link } from "@remix-run/react";

const THREEFEATURES = () => {
  
    return (
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray-200 sm:flex-row flex-col">
              <div className="sm:w-32 sm:h-32 h-20 w-20 sm:mr-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 flex-shrink-0">
              <img stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="sm:w-16 sm:h-16 w-10 h-10" viewBox="0 0 24 24" 
                src={require(".././assets/database.svg")} alt="database icon" /> 
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
              </div>
              <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
                <h2 className="text-gray-900 text-lg title-font font-medium mb-2">Setup made for non Devs</h2>
                <p className="leading-relaxed text-base">Setting up your Databases in SQLtroughAI is easy. Just upload a Excel, CSV or add the Columns manually.</p>
                <a className="mt-3 text-indigo-600 inline-flex items-center" ><Link to="/databaseSetupBlog">Learn More</Link>
                  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            </div>
            <div className="flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray-200 sm:flex-row flex-col">
              <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
                <h2 className="text-gray-900 text-lg title-font font-medium mb-2">Queries in the database language you need.</h2>
                <p className="leading-relaxed text-base">We support many SQL languages. Including MySQL, Mongo DB, Oracle PL/SQL and many more. If you need one that we doesnt support jet feel free to message us!</p>
                <a className="mt-3 text-indigo-600 inline-flex items-center">
                  
                </a>
              </div>
              <div className="sm:w-32 sm:order-none order-first sm:h-32 h-20 w-20 sm:ml-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-white flex-shrink-0">
              <img stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="sm:w-16 sm:h-16 w-10 h-10" viewBox="0 0 24 24" 
                src={require(".././assets/databases.svg")} alt="databases icon" />                  
                  <circle cx="6" cy="6" r="3"></circle>
                  <circle cx="6" cy="18" r="3"></circle>
                  <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"></path>
              </div>
            </div>
            <div className="flex items-center lg:w-3/5 mx-auto sm:flex-row flex-col">
              <div className="sm:w-32 sm:h-32 h-20 w-20 sm:mr-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-white flex-shrink-0">
                <img stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="sm:w-16 sm:h-16 w-10 h-10" viewBox="0 0 24 24" 
                src={require(".././assets/artificial-intelligence.svg")} alt="artificial intelligence ai icon" />
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
              </div>
              <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
                <h2 className="text-gray-900 text-lg title-font font-medium mb-2">State of the Art AI Tech.</h2>
                <p className="leading-relaxed text-base">We use the latest AI technology from Open AI, which we have further developed specifically for our usecase. This sets us apart from the market.</p>
                <a className="mt-3 text-indigo-600 inline-flex items-center">                  
                  
                </a>
              </div>
            </div>
          </div>
        </section>
      );
    };
    
  export default THREEFEATURES;
  


