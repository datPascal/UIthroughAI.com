import { useOptionalUser } from "~/utils";
import { Form, Link } from "@remix-run/react";
import { useState, useEffect, useRef } from 'react';



export default function HEADERBEFORELOGIN() {
  const user = useOptionalUser(); 
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !event.target.closest('#menu-btn')
      ) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-white text-black md:flex md:justify-between md:items-center p-4">
      <div className="flex items-center justify-between">
        <a href="https://UItroughAI.com" className="flex items-center">
          <img
            src={require("./../assets/UItroughAIIcon.png")}
            className="h-12 mr-3"
            alt="UItroughAI Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap ">
            UItroughAI
          </span>
        </a>
        <button
          className="md:hidden p-2 bg-blue-700 rounded-md text-white"
          id="menu-btn"
          onClick={toggleMobileMenu}
        >
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
      <nav className="hidden md:flex space-x-4">
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
      </nav>
        <div
          ref={menuRef}
          className={`menu-dropdown ${
            mobileMenuOpen ? '' : 'hidden'
          } z-50 absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg p-2 space-y-2`}
          id="mobile-menu"
        >
          {user ? (
                  <Link
                    to="/Queries"
                    className="block px-4 py-2 text-gray-700 text-right hover:border-b-2 hover:border-blue-500"
                  >
                    Get to your Workspace {user.email}
                  </Link>
                ) : (
                  <div>
                    <Link
                      to="/join"
                      className="block px-4 py-2 text-gray-700 text-right hover:border-b-2 hover:border-blue-500"
                    >
                      Try it out for free
                    </Link>
                    <Link
                      to="/login"
                      className="block px-4 py-2 text-gray-700 text-right hover:border-b-2 hover:border-blue-500"
                    >
                      Log In
                    </Link>
                  </div>
                )}
          
        </div>
    </header>
  );
}
  










