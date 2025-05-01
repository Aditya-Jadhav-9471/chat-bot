import { useState, useEffect } from "react";

const ConversationsPanel = () => {
  // Sample data structure for conversations
  const [conversations, setConversations] = useState([
    { user: "JohnDoe", status: "Bot", messages: ["Hi", "How are you?", "I need an agent"] },
    { user: "JaneSmith", status: "Agent", messages: ["Hello", "I need help", "Can you assist me?"] },
  ]);

  const [selectedConversation, setSelectedConversation] = useState(null);

  const handleSelectConversation = (index) => {
    setSelectedConversation(conversations[index]);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 p-4">
        <h2 className="text-2xl font-bold mb-4">Conversations</h2>
        <div className="space-y-4">
          {conversations.map((conversation, index) => (
            <div
              key={index}
              className="cursor-pointer p-2 rounded hover:bg-blue-100"
              onClick={() => handleSelectConversation(index)}
            >
              <div className="font-semibold">{conversation.user}</div>
              <div className="text-sm text-gray-600">Chat with {conversation.status}</div>
            </div>
          ))}
        </div>
      </aside>

      {/* Chat Panel */}
      <main className="flex-1 p-6">
        {selectedConversation ? (
          <div>
            <h2 className="text-xl font-bold">Chat with {selectedConversation.user}</h2>
            <div className="mt-4 p-4 bg-white rounded shadow-lg">
              {selectedConversation.messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-2 ${index % 2 === 0 ? "text-left" : "text-right"}`}
                >
                  <div
                    className={`p-2 rounded ${
                      index % 2 === 0 ? "bg-gray-200" : "bg-blue-100"
                    }`}
                  >
                    {message}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500">Select a conversation to view chat</div>
        )}
      </main>
    </div>
  );
};

export default ConversationsPanel;
