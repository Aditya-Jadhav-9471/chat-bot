// components/adminDashboard/AdminLayout.jsx
import AdminSidebar from "./AdminSidebar";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-6 bg-gray-100">{children}</main>
    </div>
  );
};

export default AdminLayout;
