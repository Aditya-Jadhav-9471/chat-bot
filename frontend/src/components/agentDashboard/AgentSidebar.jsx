import { NavLink } from "react-router-dom";
import { LogOut, MessageCircle, Users } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const AgentSidebar = () => {
  const { logout } = useContext(AuthContext);

  const navItemClass = ({ isActive }) =>
    `flex items-center gap-2 w-full text-left px-4 py-2 rounded hover:bg-blue-100 transition ${
      isActive ? "bg-blue-200 font-semibold text-blue-800" : "text-gray-700"
    }`;

  return (
    <aside className="w-64 bg-white border-r flex flex-col justify-between h-screen p-4">
      <div>
        <h2 className="text-2xl font-bold mb-6 text-blue-800">Agent Panel</h2>
        <nav className="space-y-2">
          <NavLink to="/agent/requests" className={navItemClass}>
            <Users size={18} />
            Incoming Requests
          </NavLink>
          <NavLink to="/agent/chat" className={navItemClass}>
            <MessageCircle size={18} />
            Chat with Users
          </NavLink>
        </nav>
      </div>

      <button
        onClick={logout}
        className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
      >
        <LogOut size={18} />
        Logout
      </button>
    </aside>
  );
};

export default AgentSidebar;
