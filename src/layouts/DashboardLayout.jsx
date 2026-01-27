import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';

function DashboardLayout() {
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const token = Cookies.get('hexToken');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;