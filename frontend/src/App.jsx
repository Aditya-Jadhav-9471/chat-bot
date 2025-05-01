import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useContext } from "react";

import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import UserDashboard from "./components/userDashboard/ChatBotWindow";
import AgentDashboard from "./pages/AgentDashboard";
import AdminDashboard from "./pages/AdminDashboard";

import AgentHome from "./components/agentDashboard/AgentHome";
import IncomingRequests from "./components/agentDashboard/IncomingRequests";
import AgentChatPage from "./components/agentDashboard/AgentChatPage";

import AdminHome from "./components/adminDashboard/AdminHome";
import AdminCreateUserForm from "./components/adminDashboard/AdminCreateUserForm";
import ConversationsPanel from "./components/adminDashboard/ConversationsPanel";

import { AuthContext } from "./context/AuthContext";

function App() {
  const { user } = useContext(AuthContext);

  const PrivateRoute = ({ children, role }) => {
    if (!user) return <Navigate to="/auth" />;
    if (user.role !== role) return <Navigate to="/" />;
    return children;
  };

  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route path="/" element={<HomePage />} />
        <Route
          path="/auth"
          element={
            user ? (
              user.role === "admin" ? (
                <Navigate to="/admin" />
              ) : user.role === "agent" ? (
                <Navigate to="/agent" />
              ) : (
                <Navigate to="/user" />
              )
            ) : (
              <AuthPage />
            )
          }
        />

        {/* User Dashboard */}
        <Route
          path="/user"
          element={
            <PrivateRoute role="user">
              <UserDashboard />
            </PrivateRoute>
          }
        />

        {/* Agent Dashboard & Routes */}
        <Route
          path="/agent"
          element={
            <PrivateRoute role="agent">
              <AgentDashboard />
            </PrivateRoute>
          }
        >
          <Route index element={<AgentHome/>} />
          <Route path="requests" element={<IncomingRequests />} />
          <Route path="chat" element={<AgentChatPage />} />
        </Route>

        {/* Admin Dashboard & Routes */}
        <Route
          path="/admin"
          element={
            <PrivateRoute role="admin">
              <AdminDashboard />
            </PrivateRoute>
          }
        >
          {/* <Route index element={<Navigate to="create-user" />} /> */}
          <Route index element={<AdminHome />} />
          <Route path="create-user" element={<AdminCreateUserForm />} />
          <Route path="conversations" element={<ConversationsPanel />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
