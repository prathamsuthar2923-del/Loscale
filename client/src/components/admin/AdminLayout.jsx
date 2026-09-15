import { Outlet } from 'react-router-dom';
import Seo from '../seo';
import AdminSidebar from './AdminSidebar';

export default function AdminLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-[#f7f7f8]">
      <Seo title="Admin" noindex />
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto overflow-x-hidden p-8">
        <Outlet />
      </main>
    </div>
  );
}
