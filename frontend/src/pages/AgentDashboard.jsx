// /pages/AgentDashboard.jsx
import { Outlet } from "react-router-dom";
import AgentSidebar from "../components/agentDashboard/AgentSidebar";

const AgentDashboard = () => {
  return (
    <div className="flex h-screen">
      <AgentSidebar />
      <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
};

export default AgentDashboard;
