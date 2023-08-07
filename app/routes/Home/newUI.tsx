import type {
    ActionFunction,
    LoaderArgs,
    MetaFunction,
  } from "@remix-run/node";
  import chat from "../../ChatUI/chat";
  import UI from "../../showUI/showUI";
  import { json } from "@remix-run/node";
  import { requireUserId } from "~/session.server";
  import { Resizable } from 're-resizable';


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
    console.log("newUI")
    return _action
  };

  const ResizableDivs: React.FC = (messages, data) => {
    return (
      <div className="flex w-full overflow-clip h-full">
        <Resizable className="box" defaultSize={{ width: '50%', height: '100%' }} handleStyles={{
            right: { width: '5px', backgroundColor: 'black', cursor: 'col-resize' }}}>
          {chat(messages,data)}
        </Resizable>
        
        <div className="flex-grow h-full flex items-center justify-center overflow-auto">
            <UI html={'<p>Hello</p>'}></UI>
        </div>
      </div>
    );
  }
  

export default function newUI() {

  type Message = {
    id: string;
    content: string;
    role: string;
  };
  
  let messages: Message[] = [
    {
      id: '1',
      content: 'Hello there! Hello there! Hello there! Hello there! Hello there!',
      role: 'user',
    }
  ];
  let data = [
    {
      id: '1',
      content: 'Hello there! Hello there! Hello there! Hello there! Hello there!',
      role: 'user',
    }
  ];
    
    return (
      <div>
        {ResizableDivs(messages,data)}
      </div>
    );
  }