// /components/agentDashboard/AgentHome.jsx
const AgentHome = () => {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-blue-800">Welcome Agent 👋</h1>
        <p className="text-gray-600">
          You're logged in as an agent. From here, you can manage incoming chat requests and communicate directly with users.
        </p>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">📥 Incoming Requests</h2>
            <p className="text-gray-600">Check for new users looking for live chat support. Handle them promptly from the sidebar.</p>
          </div>
  
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">💬 Active Chats</h2>
            <p className="text-gray-600">Continue conversations with users and provide assistance in real-time.</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default AgentHome;
  