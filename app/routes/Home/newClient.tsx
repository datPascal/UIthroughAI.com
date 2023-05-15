import type {
    ActionFunction,
    LoaderArgs,
    MetaFunction,
  } from "@remix-run/node";
  import { json, redirect } from "@remix-run/node";
  import { Form, Link, useLoaderData, useActionData, useTransition} from "@remix-run/react";
  import { getProfileById } from "~/models/user.server";
  import { requireUserId } from "~/session.server";
  import { useUser } from "~/utils";
  import { useState } from "react";
  import { createClient } from "~/models/clients.server";


  export const meta: MetaFunction = () => {
    return { title: "Create a new Client" };
  };
  
  type LoaderData = {
    userId: string; // add the `userId` key with the type of the value
  };
  
  interface ActionData {
    errors: {
      status?: string;
      error?: string;
    };
  }

  export async function loader ({ request }: LoaderArgs) {
    const userId = await requireUserId(request);
    const loaderData: LoaderData = {
      userId, // add the `userId` value to the object
    };
    return json(loaderData); // return the object instead of just `noteListItems`
  };


  export let action: ActionFunction = async ({ request }) => {
    // get the form data from the request + UserId
    const userId = await requireUserId(request);
    let formData = await request.formData();
    let _action = formData.get("_action");
    
    if (_action === "newClient") {
      let fullName = formData.get("full_name");
      let email = formData.get("email");
      let street_nr = formData.get("street_nr");
      let plz = formData.get("plz");
      let ort = formData.get("ort");
      let bundesland = formData.get("bundesland");
      let referenceId = formData.get("referenceId");


      // What if a user sends no name?
      if (fullName === "" || fullName === null) {
        const actionData: ActionData = {
          errors: {
            error: "Please enter a Name",
          },
        };
        return json(actionData)
      }
    
      const Client = await createClient({ fullName, email, street_nr, plz, ort, bundesland, referenceId, userId })

      return redirect(`/Home/${Client.id}`);
    }
  };
  

export default function newClient() {

    const transition = useTransition();
    const isSaving = Boolean(transition.submission);
  
    const data = useLoaderData<typeof loader>() as LoaderData;
    const Actiondata = useActionData();

    const Error = (Actiondata?.errors?.error ?? "") !== "" && Actiondata.errors.error;

    // datafields
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [street_nr, setStreet_nr] = useState('');
    const [plz, setPlz] = useState('');
    const [ort, setOrt] = useState('');
    const [bundesland, setBundesland] = useState('');
    const [referenceId, setReferenceId] = useState('');
  
  
    return (
      <div className="min-h-screen p-6 flex items-center justify-center">
        <Form method="post">
        <div className="container max-w-screen-lg mx-auto">
          <div>
            <div className="bg-gray-50 rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div className="text-gray-600">
                  <p className="font-medium text-lg">Persönliche Details</p>
                  {Error && (
                        <div id="Error" className="justify-center flex items-center mt-2 text-red-500">
                          {Error}
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
                        <button type="submit" name="_action" value="newClient" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
         
                        Klienten anlegen
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