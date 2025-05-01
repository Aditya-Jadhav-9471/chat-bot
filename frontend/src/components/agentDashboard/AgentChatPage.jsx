import { useState, useRef, useEffect } from "react";

const AgentChatPage = () => {
  const [messages, setMessages] = useState([
    { sender: "user", text: "Hello, I need help", timestamp: "10:01 AM" },
    { sender: "agent", text: "Sure, how can I assist you?", timestamp: "10:02 AM" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const newMessage = {
      sender: "agent",
      text: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([...messages, newMessage]);
    setInput("");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-full border rounded p-4 bg-white">
      <h2 className="text-xl font-semibold mb-4">Chat with User</h2>

      <div className="flex-1 overflow-y-auto mb-4 space-y-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 rounded max-w-xs ${
              msg.sender === "agent" ? "ml-auto bg-blue-100 text-right" : "bg-gray-200"
            }`}
          >
            <p>{msg.text}</p>
            <small className="text-xs text-gray-500">{msg.timestamp}</small>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={sendMessage} className="flex gap-2">
        <input
          type="text"
          className="flex-1 border rounded px-3 py-2"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default AgentChatPage;
