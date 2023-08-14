import { useState } from 'react';

export default function Home() {
  const [messages, setMessages] = useState([
    { user: "user1", text: "test" },
    { user: "user2", text: "test2" }
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    setMessages([...messages, { user: "user1", text: newMessage }]);
    setNewMessage("");
  };

  return (
    <div className="p-4">
      <div className="flex flex-col space-y-2">
        {messages.map((message, index) => (
          <div key={index} className="chat">
            <div className="chat-bubble">{message.text}</div>
          </div>
        ))}
      </div>
      <div className="flex justify-end mt-6">
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered input-primary flex-grow"
          onChange={handleNewMessageChange}
          value={newMessage}
        />
        <button className="btn btn-primary ml-2" onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}
