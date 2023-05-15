import { requireUserId } from "~/session.server";
import { json } from "@remix-run/node";
import type { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getProfileById } from "~/models/user.server";
import { useLocation } from 'react-router-dom';
import FAQ from "./faq";



type LoaderData = {
  userId: string; // add the `userId` key with the type of the value
  profile: any;
  paymentlink: string;
};

export async function loader ({ request }: LoaderArgs) {
  const userId = await requireUserId(request);
  const profile = await getProfileById(userId);
  const email = profile.email.replace('@', '%40');
  let paymentlink = "https://buy.stripe.com/cN22bs0jZgUNeRi6oo?prefilled_email=" + email + "&client_reference_id=" + userId;
  console.log("paymentlink", paymentlink)

  const loaderData: LoaderData = {
    userId, // add the `userId` value to the object
    profile, 
    paymentlink
  };

  return json(loaderData); // return the object instead of just `noteListItems`
};

export default function PRICING() {
    const data = useLoaderData<typeof loader>() as LoaderData;

    const location = useLocation();
    
    const searchParams = new URLSearchParams(location.search);
    const reasonForRedirect = searchParams.get('reason');

  
    return (
        <section className="text-gray-600 bg-slate-800 body-font">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-col text-center w-full mb-20">
            {reasonForRedirect && (
              <div className="border-white mb-8">
                <p className="text-white p-4">{reasonForRedirect}</p>
              </div>
            )}
              <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-white">Become PRO</h1>
              <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-white">Your time is worth more than ~0.5 Bucks a day.</p>
            </div>
            <div className="flex flex-col text-center w-full mb-20">
              <div className="p-4 xl:w-1/4 md:w-1/2 w-full mx-auto">
                <div className="h-full p-6 rounded-lg border-2 bg-gray-700 border-indigo-500 flex flex-col relative overflow-hidden">
                  <span className="bg-indigo-500 text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl">POPULAR</span>
                  <h2 className="text-sm tracking-widest title-font mb-1 text-white font-medium">PRO</h2>
                  <h1 className="text-5xl leading-none flex items-center pb-4 mb-4 border-b text-white border-gray-200">
                    <span >$15</span>
                    <span className="text-lg ml-1 font-normal text-gray-300">/mo</span>
                  </h1>
                  <p className="flex items-center text-white mb-2">
                    <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                      <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                        <path d="M20 6L9 17l-5-5"></path>
                      </svg>
                    </span>unlimited queries
                  </p>
                  <p className="flex items-center text-white mb-2">
                    <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                      <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                        <path d="M20 6L9 17l-5-5"></path>
                      </svg>
                    </span>unlimited databases
                  </p>
                  <p className="flex items-center text-white mb-2">
                    <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                      <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                        <path d="M20 6L9 17l-5-5"></path>
                      </svg>
                    </span>immense time savings
                  </p>
                  <p className="flex items-center text-white mb-6">
                    <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                      <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                        <path d="M20 6L9 17l-5-5"></path>
                      </svg>
                    </span>monthly cancellable 
                  </p>
                  <a className="flex items-center mt-auto text-white bg-indigo-500 border-0 py-2 px-4 w-full focus:outline-none hover:bg-indigo-600 rounded" href={data.paymentlink} >Subscribe
                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-auto" viewBox="0 0 24 24">
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </a>
                  <p className="text-xs text-gray-500 mt-3">Please use the same E-Mail as u use with your SQLtroughAI Account</p>
                </div>
              </div>
              <FAQ />
            </div>
          </div>
        </section>
    );
  };