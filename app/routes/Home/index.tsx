import Clients from "./clients"; 
import { json } from "@remix-run/node";
import type {
  ActionFunction,
  LoaderArgs,
  MetaFunction,
} from "@remix-run/node";
import { Form, Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";
import type { client } from "~/models/clients.server";
import { getClientList } from "~/models/clients.server";
import { requireUserId } from "~/session.server";



export const meta: MetaFunction = () => {
  return { title: "Homescreen Therapyflow" };
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

export default function index() {
  const data = useLoaderData<typeof loader>() as LoaderData;

  return (
    <Clients></Clients>
  );
}