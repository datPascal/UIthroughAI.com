import type {
    ActionFunction,
    LoaderArgs,
    MetaFunction,
  } from "@remix-run/node";
  import { renderMessages } from "./renderMessages";
  import { json, redirect } from "@remix-run/node";
  import { Form, useLoaderData, useActionData, useTransition} from "@remix-run/react";
  import { requireUserId } from "~/session.server";
  import { useState } from "react";
  import { createClient } from "~/models/clients.server";
  import Select from "react-tailwindcss-select";


export default function chat(messages:object, data:object) {
    const [databaseIds, setDatabaseIds] = useState([]);
    const [copySuccess, setCopySuccess] = useState<{ [key: string]: boolean }>({});

    //const options = data.options;
    //const databases = data.options;

    const showCopySuccess = (id: string) => {
        setCopySuccess((prev) => ({ ...prev, [id]: true }));
        setTimeout(() => {
        setCopySuccess((prev) => ({ ...prev, [id]: false }));
        }, 1500); // You can change the duration of the checkmark display here (in milliseconds)
    };

    const copyToClipboard = (text: string, id: string) => {
        navigator.clipboard.writeText(text).then(
        () => {
            console.log('Text copied to clipboard:', text);
            showCopySuccess(id);
        },
        (err) => {
            console.error('Could not copy text: ', err);
        }
        );
    };
      
    return (
      <div className="flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen">
        <Form method="post" className="flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen">

          <div className="sm:items-center py-3 border-b-2 border-gray-200">
            <p>Select your UI Style</p>
          </div>
        
          <div id="messages" className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
            {renderMessages(messages)}
          </div>

          <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
            <div id="bottom-menu" className="relative flex">
                
                <div className="relative w-full">
                    <input type="text" name="prompt" id="prompt" placeholder="Tell me what you need.." className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500" required/>
                    <button type="submit" name="_action" value="QueryRequest" className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 transform rotate-90">
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                    </svg>
                    <span className="sr-only">Query</span>
                    </button>
                </div>

            </div>
          </div>  

        </Form>
      </div>
    );
  }