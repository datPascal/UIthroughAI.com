interface Message {
    id: string;
    role: string;
    content: string;
  }

const userMessage = (message: Message) => (
    <div key={message.id} className="chat-message">
      <div className="flex items-end">
        <div className="flex flex-col space-y-2 text-s max-w-2xl mx-2 order-2 items-start">
          <div>
            <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300  text-gray-600">
              {message.content}
            </span>
          </div>
        </div>
        <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
      </div>
    </div>
    );
  
  const assistentMessage = (message: Message) => (
    <div key={message.id} className="chat-message">
      <div className="flex items-end justify-end">
        <div className="flex flex-col space-y-2 text-s max-w-2xl mx-2 order-1 items-end">
          <div>
            <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">
              {message.content}
            </span>
            <button
              onClick={() => copyToClipboard(message.content, message.id)}
              className=""
            >
              {copySuccess[message.id] ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="align-middle h-6 w-6 text-green-500 animate-bounce"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              ) : (
                <p className="ml-2 px-2 py-1 rounded text-xs font-semibold text-white bg-blue-500 hover:bg-blue-400">Copy</p>
              )}
            </button>
          </div>
        </div>
        
        <img
          src={require('../assets/PerfectHairAI_Icon.png')}
          alt="My profile"
          className="w-6 h-6 rounded-full order-2"
        ></img>
      </div>
    </div>
  );
  
  export const renderMessages = (data:any) => {
      return data.map((message: Message) => {
        if (message.role === "user") {
          return userMessage(message);
        } else if (message.role === "assistent") {
          return assistentMessage(message);
        }
        return null;
      });
  };