import type {
    ActionFunction,
    LoaderArgs,
    MetaFunction,
  } from "@remix-run/node";
  import { json } from "@remix-run/node";
  import { Form, Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";
  import type { client } from "~/models/clients.server";
  import { getClientList } from "~/models/clients.server";
  import { requireUserId } from "~/session.server";
  
  export const meta: MetaFunction = () => {
    return { title: "Overview of your Databases in SQLtroughAI" };
  };
  
  type LoaderData = {
    ClientListItems: client[];
    userId: string; // add the `userId` key with the type of the value
  }; 
  
  export async function loader ({ request }: LoaderArgs) {
    const userId = await requireUserId(request);
    const ClientListItems = await getClientList({ userId }) as client[];
    const loaderData: LoaderData = {
      ClientListItems,
      userId, // add the `userId` value to the object
    };
    return json(loaderData); // return the object instead of just `ClientListItems`
  };
  
  
  export let action: ActionFunction = async ({ request }) => {
  };
  
  export default function Clients() {
    const data = useLoaderData<typeof loader>() as LoaderData;
  
    return (
      <div> 
      <aside id="logo-sidebar" className={`absolute top-0 left-0 z-40 w-64 h-screen transition-transform`} aria-label="Sidebar" style={{position: 'relative'}}>
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">

          {data.ClientListItems.length === 0 ? (
                                    <Link to="./newClient" key="newClient" title="Create a new Client" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                                        <span className="ml-3">Create new Client</span>
                                    </Link>
                                              ) : (
                                                <div> 
                                    {data.ClientListItems.map((client) => (
                                      <Link to={`/Home/${client.id}`} key={client.id} title={client.fullName} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                      <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                                          <span className="ml-3">{client.fullName}</span>
                                      </Link>
                                    ))}
                                    <Link to="./newClient" key="newClient" title="Create a new Client" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                                        <span className="ml-3">Create new Client</span>
                                    </Link>
                                    </div>
                                  )}
                                  
          </ul>
      </div>
      </aside>

      <div className="p-4 sm:ml-64">
      <Outlet/>
      </div>

    </div>

      );
  }
  