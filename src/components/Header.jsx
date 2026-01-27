import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Button } from '@/components/ui/Button';
import { Menu } from 'lucide-react';

function Header({ setSidebarOpen }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove('hexToken');
    navigate('/login');
  };

  return (
    <header className="bg-white border-b p-4 flex items-center justify-between md:justify-end">
      {/* Hamburger Menu for mobile */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="md:hidden text-gray-500 focus:outline-none"
      >
        <Menu className="h-6 w-6" />
      </button>

      <Button variant="secondary" onClick={handleLogout}>Logout</Button>
    </header>
  );
}

export default Header;