import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';

export default function AdminLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-[#f7f7f8]">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto overflow-x-hidden p-8">
        <Outlet />
      </main>
    </div>
  );
}
