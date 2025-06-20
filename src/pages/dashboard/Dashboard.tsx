import { Outlet } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";


export default function DashboardLayout() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
