import type { ActionFunction, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, useLoaderData, useActionData, useTransition} from "@remix-run/react";
import { requireUserId } from "~/session.server";
import invariant from "tiny-invariant";
import type { MetaFunction } from "@remix-run/node";
import { client, getClient } from "~/models/clients.server";
import { useState } from 'react';
import { updateClient } from "~/models/clients.server";


type LoaderData = {
  client: client;
  userId: string; // add the `userId` key with the type of the value
};

interface ActionData {
  action: {
    action?: string;
  };
  errors: {
    error?: string;
  };
}


export async function loader({ request, params }: LoaderArgs) {
  const userId = await requireUserId(request);
  invariant(params.client, "client not found"); 

  const client = await getClient({ userId, id: params.client });
  if (!client) {
    throw new Response("Not Found", { status: 404 });
  }

  return json({ client, userId });
};

export const meta: MetaFunction = () => {
  return { title: "View of a specific client" };
};

export let action: ActionFunction = async ({ request, params }) => {
  // get the form data from the request + UserId
  const userId = await requireUserId(request);
  let formData = await request.formData();
  let _action = formData.get("_action");
  
  if (_action === "updateClientData") {
    let fullName = formData.get("full_name");
    let email = formData.get("email");
    let street_nr = formData.get("street_nr");
    let plz = formData.get("plz");
    let ort = formData.get("ort");
    let bundesland = formData.get("bundesland");
    let referenceId = formData.get("referenceId");

    console.log("params", params)

    // What if a user sends no name?
    if (fullName === "" || fullName === null) {
      const actionData: ActionData = {
        errors: {
          error: "Please enter a Name",
        },
      };
      return json(actionData)
    }
  
    const Query = await updateClient({ fullName, email, street_nr, plz, ort, bundesland, referenceId, id: params.client, userId: userId })

    const actionData: ActionData = {
      action: {
        action: "Daten erfolgreich geändert",
      },
    };
    return json(actionData)
  }
};


export default function NoteDetailsPage() {
  const data = useLoaderData<typeof loader>() as LoaderData;
  const [fullName, setFullName] = useState(data.client?.fullName || '');
  const [email, setEmail] = useState(data.client?.email || '');
  const [street_nr, setStreet_nr] = useState(data.client?.street_nr || '');
  const [plz, setPlz] = useState(data.client?.plz || '');
  const [ort, setOrt] = useState(data.client?.ort || '');
  const [bundesland, setBundesland] = useState(data.client?.bundesland || '');
  const [referenceId, setReferenceId] = useState(data.client?.referenceId || '');

  const transition = useTransition();
  const isSaving = Boolean(transition.submission);
  const Actiondata = useActionData();

  const Error = (Actiondata?.errors?.error ?? "") !== "" && Actiondata.errors.error;
  const Action = (Actiondata?.action?.action ?? "") !== "" && Actiondata.action.action;



  return (

    <div className="min-h-screen p-6 flex items-center justify-center">
    <Form method="post">
    <div className="container max-w-screen-lg mx-auto">
      <div>
        <div className="bg-gray-50 rounded shadow-lg p-4 px-4 md:p-8 mb-6">
          <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
            <div className="text-gray-600">
              <p className="font-medium text-lg">Persönliche Details</p>
              {Action && (
                    <div id="Action" className="justify-center flex items-center mt-2 text-green-500">
                      {Action}
                    </div>
                    )}
            </div>

            <div className="lg:col-span-2">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                <div className="md:col-span-5">
                  <label for="full_name">Name</label>
                  <input
                    type="text"
                    name="full_name"
                    id="full_name"
                    className="h-10 border mt-1 rounded px-4 w-full bg-white"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />                    
                </div>

                <div className="md:col-span-5">
                  <label for="email">E-Mail Adresse</label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    className="h-10 border mt-1 rounded px-4 w-full bg-white"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  /> 
                </div>

                <div className="md:col-span-3">
                  <label for="street_nr">Straße & Hausnummer</label>
                  <input
                    type="text"
                    name="street_nr"
                    id="street_nr"
                    className="h-10 border mt-1 rounded px-4 w-full bg-white"
                    value={street_nr}
                    onChange={(e) => setStreet_nr(e.target.value)}
                  /> 
                </div>

                <div className="md:col-span-2">
                  <label for="plz">PLZ</label>
                  <input
                    type="text"
                    name="plz"
                    id="plz"
                    className="h-10 border mt-1 rounded px-4 w-full bg-white"
                    value={plz}
                    onChange={(e) => setPlz(e.target.value)}
                  /> 
                </div>

                <div className="md:col-span-2">
                  <label for="ort">Ort</label>
                    <input
                    type="text"
                    name="ort"
                    id="ort"
                    className="h-10 border mt-1 rounded px-4 w-full bg-white"
                    value={ort}
                    onChange={(e) => setOrt(e.target.value)}
                  /> 
                </div>

                <div className="md:col-span-3">
                  <label for="bundesland">Bundesland</label>
                    <input
                    type="text"
                    name="bundesland"
                    id="bundesland"
                    className="h-10 border mt-1 rounded px-4 w-full bg-white"
                    value={bundesland}
                    onChange={(e) => setBundesland(e.target.value)}
                  /> 
                </div>

                <div className="md:col-span-5">
                  <label for="referenceId">ReferenzID</label>
                    <input
                    type="text"
                    name="referenceId"
                    id="referenceId"
                    className="h-10 border mt-1 rounded px-4 w-full bg-white"
                    value={referenceId}
                    onChange={(e) => setReferenceId(e.target.value)}
                  /> 
                </div>
                
                <div className="md:col-span-5 text-right pt-2">
                  <div className="inline-flex items-end">
                  {isSaving ? "Loading..." : 
                    <button type="submit" name="_action" value="updateClientData" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
     
                    Daten speichern
                    </button>}

                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Form>
  </div>
  );
}

