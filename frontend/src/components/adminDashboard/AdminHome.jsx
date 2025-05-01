const AdminHome = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-full">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">Welcome, Admin!</h1>

      <p className="text-gray-700 mb-8 text-lg">
        Here's a quick overview of your dashboard. Use the tools below to manage
        users and monitor conversations.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            👤 User Management
          </h2>
          <p className="text-gray-600">
            Add and manage all platform users from the sidebar.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            💬 Conversations
          </h2>
          <p className="text-gray-600">
            View all conversations between users and agents via the sidebar.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            👤 User Management
          </h2>
          <p className="text-gray-600">
            Add and manage all platform users from the sidebar.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            💬 Conversations
          </h2>
          <p className="text-gray-600">
            View all conversations between users and agents via the sidebar.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
