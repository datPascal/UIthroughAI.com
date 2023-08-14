import { useUser } from "~/utils";
import { Form, Link } from "@remix-run/react";
import { useState, useEffect, useRef } from 'react';



export default function HEADER() {
  const user = useUser();
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
      <nav className="hidden md:flex space-x-4 align-baseline ml-auto">
        <a
          href="https://billing.stripe.com/p/login/bIYbLU6vXaGf4PS9AA"
          className="flex items-center justify-center px-4 py-3 font-medium text-gray-900 hover:underline"
        >
          User
        </a>
        <Form
          action="/logout"
          method="post"
          className="flex items-center justify-center px-4 py-3 font-medium text-gray-900 hover:underline"
        >
          <button
            type="submit"
            className="inline-flex p-2 bg-blue-500 focus:outline-none hover:bg-blue-600 text-white rounded text-base"
          >
            Logout
            <svg
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              className="w-4 h-4 ml-1"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button>
        </Form>
      </nav>
      <Form action="/logout" method="post">
        <div
          ref={menuRef}
          className={`menu-dropdown ${
            mobileMenuOpen ? '' : 'hidden'
          } z-50 absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg p-2 space-y-2`}
          id="mobile-menu"
        >
          <a
            href="https://billing.stripe.com/p/login/bIYbLU6vXaGf4PS9AA"
            className="block px-4 py-2 text-gray-700 text-right hover:border-b-2 hover:border-blue-500"
            onClick={() => setMobileMenuOpen(false)}
          >
            User
          </a>
          <button
            type="submit"
            className="absolute right-0 inline-flex items-center bg-blue-500 border-0 py-1 px-3 focus:outline-none hover:bg-blue-600 text-white rounded text-base mt-4 md:mt-0"
          >
            Logout
            <svg
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              className="w-4 h-4 ml-1"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </Form>
    </header>
  );
}