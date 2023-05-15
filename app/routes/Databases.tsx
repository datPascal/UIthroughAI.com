import type {
    ActionFunction,
    LoaderArgs,
    MetaFunction,
  } from "@remix-run/node";
  import { Outlet } from "@remix-run/react";
  import HEADER from "./header";

  export const meta: MetaFunction = () => {
    return { title: "Database Menu SQLtroughAI" };
  };

  export default function MainscreenCustomer() {
 
    return (
      <div className="flex h-full min-h-screen flex-col bg-white content-center">
        
        <HEADER/>
        <Outlet/>
        
      </div>
    );
  }