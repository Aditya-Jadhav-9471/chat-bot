import { useState, useEffect, useRef, useContext } from "react";
import { BotIcon, XCircle, LogOut } from "lucide-react";
import { getBotReply } from "../../services/botService"; // Only getBotReply now
import { AuthContext } from "../../context/AuthContext";
import { io } from "socket.io-client";

const socket = io('http://localhost:5000', {
  withCredentials: true
});

const UserDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [connectedToAgent, setConnectedToAgent] = useState(false);
  const [agentId, setAgentId] = useState(null);

  const { user, logout } = useContext(AuthContext);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (user) {
      socket.emit("registerUser", {
        userId: user.id,
        // No need to send 'role' explicitly anymore
      });
    }

    // Listen for agent assignment
    socket.on("agentAssigned", ({ agentId }) => {
      setConnectedToAgent(true);
      setAgentId(agentId);
      addBotMessage("You are now connected to a live agent!");
    });

    // Listen for incoming agent messages
    socket.on("chatMessageFromAgent", ({ message }) => {
      addAgentMessage(message);
    });

    return () => {
      socket.off("agentAssigned");
      socket.off("chatMessageFromAgent");
    };
  }, [user]);

  const addBotMessage = (text) => {
    setMessages((prev) => [
      ...prev,
      { text, sender: "bot", timestamp: formatTimestamp(new Date()) },
    ]);
  };

  const addAgentMessage = (text) => {
    setMessages((prev) => [
      ...prev,
      { text, sender: "agent", timestamp: formatTimestamp(new Date()) },
    ]);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      text: input,
      sender: "user",
      timestamp: formatTimestamp(new Date()),
    };
    setMessages((prev) => [...prev, userMessage]);

    if (connectedToAgent) {
      socket.emit("chatMessageFromUser", {
        to: agentId,
        message: input,
      });
    } else {
      if (input.toLowerCase().includes("agent")) {
        socket.emit("sendRequestToAgent", { userId: user.id });
        addBotMessage("Connecting you to an agent, please wait...");
      } else {
        const botReply = getBotReply(input);
        setTimeout(() => {
          addBotMessage(botReply);
        }, 1000);
      }
    }

    setInput("");
  };

  const formatTimestamp = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${period}`;
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="relative min-h-screen">
      {/* Chat Icon */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all"
      >
        <BotIcon size={24} />
      </button>

      {/* Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white shadow-2xl rounded-2xl flex flex-col overflow-hidden border">
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-blue-600 text-white">
            <h2 className="text-lg font-semibold">
              {connectedToAgent ? "Live Support" : "Chat with Us"}
            </h2>

            <div className="flex space-x-2">
              <button
                onClick={logout}
                className="text-white hover:bg-red-600 p-2 rounded-full"
              >
                <LogOut size={20} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-gray-600 p-2 rounded-full"
              >
                <XCircle size={24} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 space-y-2 overflow-y-auto bg-gray-50">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg ${
                  msg.sender === "user"
                    ? "bg-blue-200 text-right ml-auto"
                    : msg.sender === "agent"
                    ? "bg-green-200 text-left mr-auto"
                    : "bg-gray-300 text-left mr-auto"
                }`}
                style={{ maxWidth: "80%" }}
              >
                <div className="font-medium">{msg.text}</div>
                <div className="text-xs text-gray-500 mt-1">{msg.timestamp}</div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <form
            onSubmit={handleSend}
            className="flex items-center p-2 border-t bg-white"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 border rounded-full p-2 mr-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition"
            >
              ➤
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
