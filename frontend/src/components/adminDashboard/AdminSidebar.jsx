import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {
  UserPlus,
  MessageCircle,
  LogOut,
} from "lucide-react";

const AdminSidebar = () => {
  const { logout } = useContext(AuthContext);

  const navItemClass = ({ isActive }) =>
    `flex items-center gap-2 w-full text-left px-4 py-2 rounded hover:bg-blue-100 transition ${
      isActive ? "bg-blue-200 font-semibold text-blue-800" : "text-gray-700"
    }`;

  return (
    <aside className="w-64 bg-white border-r flex flex-col justify-between h-screen p-4">
      <div>
        <h2 className="text-2xl font-bold mb-6 text-blue-800">Admin Panel</h2>
        <nav className="space-y-2">
          <NavLink to="create-user" className={navItemClass}>
            <UserPlus size={18} />
            Create Agent/Admin
          </NavLink>
          <NavLink to="conversations" className={navItemClass}>
            <MessageCircle size={18} />
            Conversations
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

export default AdminSidebar;
