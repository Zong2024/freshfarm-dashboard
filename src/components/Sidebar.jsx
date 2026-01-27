import { NavLink } from 'react-router-dom';
import { Users, Package, X } from 'lucide-react';
import { cn } from '@/lib/utils';

function Sidebar({ isSidebarOpen, setSidebarOpen }) {
  const navLinkClass = ({ isActive }) =>
    cn(
      "flex items-center space-x-3 py-2.5 px-4 rounded-md transition-colors duration-200 text-gray-700 hover:bg-gray-200",
      isActive ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""
    );

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden",
          isSidebarOpen ? "block" : "hidden"
        )}
        onClick={() => setSidebarOpen(false)}
      ></div>

      {/* Sidebar */}
      <aside
        className={cn(
          "w-64 bg-white border-r border-gray-200 flex-col z-30",
          "fixed md:static md:flex", // Mobile-first: hidden, slide-in. Desktop: static, flex
          isSidebarOpen ? "flex" : "hidden"
        )}
      >
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-primary">FreshFarm</h2>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden">
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>
        <nav className="flex-1 p-4">
          <ul>
            <li>
              <NavLink to="/admin/members" className={navLinkClass}>
                <Users className="h-5 w-5" />
                <span>會員</span>
              </NavLink>
            </li>
            <li className="mt-2">
              <NavLink to="/admin/products" className={navLinkClass}>
                <Package className="h-5 w-5" />
                <span>商品</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
