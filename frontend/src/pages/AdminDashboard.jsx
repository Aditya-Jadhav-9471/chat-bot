// pages/AdminDashboard.jsx
import { Outlet } from "react-router-dom";
import AdminLayout from "../components/adminDashboard/AdminLayout";

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
};

export default AdminDashboard;
