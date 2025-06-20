import Sidebar from "../../Components/sidebar/Sidebar";
import { Outlet } from "react-router-dom";


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
