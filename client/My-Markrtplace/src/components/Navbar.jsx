import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import { Moon, Sun, Menu, X } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white dark:bg-slate-900 shadow-lg border-b-2 border-gray-200 dark:border-slate-700 transition-all duration-300 ease-in-out sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-green-600 dark:text-green-400 tracking-wide transition-colors duration-300">
              TeyzixMarket
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-3">
            <Link to="/" className="text-gray-600 dark:text-slate-300 hover:text-green-600 dark:hover:text-green-400 font-medium px-3 py-2 rounded-md transition-all duration-300">
              Browse
            </Link>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-700 transition-all duration-300"
              aria-label="Toggle dark mode"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            {user ? (
              <>
                {user.role === 'customer' && (
                  <Link to="/customer-dashboard" className="text-gray-600 dark:text-slate-300 hover:text-green-600 dark:hover:text-green-400 font-medium px-3 py-2 rounded-md transition-all duration-300">
                    Buyer Dashboard
                  </Link>
                )}
                {user.role === 'provider' && (
                  <Link to="/provider-dashboard" className="text-gray-600 dark:text-slate-300 hover:text-green-600 dark:hover:text-green-400 font-medium px-3 py-2 rounded-md transition-all duration-300">
                    Seller Dashboard
                  </Link>
                )}
                {user.role === 'admin' && (
                  <Link to="/admin-dashboard" className="text-gray-600 dark:text-slate-300 hover:text-green-600 dark:hover:text-green-400 font-medium px-3 py-2 rounded-md transition-all duration-300">
                    Admin Panel
                  </Link>
                )}

                <span className="text-sm bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300 px-3 py-1.5 rounded-full font-semibold transition-all duration-300">
                  {user.name} ({user.role})
                </span>

                <button onClick={handleLogout} className="bg-red-50 dark:bg-red-900/30 hover:bg-red-100 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 font-medium px-4 py-2 rounded-md transition-all duration-300">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 dark:text-slate-300 hover:text-green-600 dark:hover:text-green-400 font-medium px-3 py-2 rounded-md transition-all duration-300">
                  Sign In
                </Link>
                <Link to="/register" className="bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-500 text-white font-medium px-4 py-2 rounded-md transition-all duration-300 shadow-sm">
                  Join
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-700 transition-all duration-300"
              aria-label="Toggle dark mode"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-700 transition-all duration-300"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-slate-700 py-4 space-y-3">
            <Link to="/" className="block text-gray-600 dark:text-slate-300 hover:text-green-600 dark:hover:text-green-400 font-medium px-3 py-2 rounded-md transition-all duration-300">
              Browse
            </Link>

            {user ? (
              <>
                {user.role === 'customer' && (
                  <Link to="/customer-dashboard" className="block text-gray-600 dark:text-slate-300 hover:text-green-600 dark:hover:text-green-400 font-medium px-3 py-2 rounded-md transition-all duration-300">
                    Buyer Dashboard
                  </Link>
                )}
                {user.role === 'provider' && (
                  <Link to="/provider-dashboard" className="block text-gray-600 dark:text-slate-300 hover:text-green-600 dark:hover:text-green-400 font-medium px-3 py-2 rounded-md transition-all duration-300">
                    Seller Dashboard
                  </Link>
                )}
                {user.role === 'admin' && (
                  <Link to="/admin-dashboard" className="block text-gray-600 dark:text-slate-300 hover:text-green-600 dark:hover:text-green-400 font-medium px-3 py-2 rounded-md transition-all duration-300">
                    Admin Panel
                  </Link>
                )}

                <div className="px-3 py-2">
                  <span className="text-sm bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300 px-3 py-1.5 rounded-full font-semibold transition-all duration-300">
                    {user.name} ({user.role})
                  </span>
                </div>

                <button onClick={handleLogout} className="w-full bg-red-50 dark:bg-red-900/30 hover:bg-red-100 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 font-medium px-4 py-2 rounded-md transition-all duration-300 text-left">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block text-gray-600 dark:text-slate-300 hover:text-green-600 dark:hover:text-green-400 font-medium px-3 py-2 rounded-md transition-all duration-300">
                  Sign In
                </Link>
                <Link to="/register" className="block bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-500 text-white font-medium px-4 py-2 rounded-md transition-all duration-300 shadow-sm text-center">
                  Join
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;