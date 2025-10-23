import { Link, useNavigate } from 'react-router-dom';
import { Sprout, Menu, X, LogOut, Home, FileText, Settings } from 'lucide-react';
import { useEffect, useState } from 'react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('authToken'));
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      localStorage.removeItem('authToken');
      localStorage.removeItem('authUser');
    } catch (e) {}
    setIsAuthenticated(false);
    navigate('/login');
  };

  useEffect(() => {
    const updateAuth = () => setIsAuthenticated(!!localStorage.getItem('authToken'));
    updateAuth();
    const onStorage = (e) => {
      if (e.key === 'authToken') updateAuth();
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Sprout className="h-8 w-8 text-green-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-500 bg-clip-text text-transparent">
              AgriHelp
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-green-600 transition-colors flex items-center space-x-1">
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/add-blog" className="text-gray-700 hover:text-green-600 transition-colors">
                  Add Blog
                </Link>
                <Link to="/crop-prediction" className="text-gray-700 hover:text-green-600 transition-colors">
                  Crop Prediction
                </Link>
                <Link to="/fertilizer" className="text-gray-700 hover:text-green-600 transition-colors">
                  Fertilizer
                </Link>
                <Link to="/disease-detection" className="text-gray-700 hover:text-green-600 transition-colors">
                  Disease Detection
                </Link>
                <div className="flex items-center space-x-4">
                  <Link to="/settings" className="text-gray-700 hover:text-green-600 transition-colors">
                    <Settings className="h-5 w-5" />
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1 text-gray-700 hover:text-red-600 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/blogs" className="text-gray-700 hover:text-green-600 transition-colors flex items-center space-x-1">
                  <FileText className="h-4 w-4" />
                  <span>Blogs</span>
                </Link>
              </>
            )}
          </div>

          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-3 space-y-3">
            <Link
              to="/"
              className="block text-gray-700 hover:text-green-600 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  to="/add-blog"
                  className="block text-gray-700 hover:text-green-600 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Add Blog
                </Link>
                <Link
                  to="/crop-prediction"
                  className="block text-gray-700 hover:text-green-600 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Crop Prediction
                </Link>
                <Link
                  to="/fertilizer"
                  className="block text-gray-700 hover:text-green-600 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Fertilizer
                </Link>
                <Link
                  to="/disease-detection"
                  className="block text-gray-700 hover:text-green-600 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Disease Detection
                </Link>
                <Link
                  to="/settings"
                  className="block text-gray-700 hover:text-green-600 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Settings
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="block w-full text-left text-gray-700 hover:text-red-600 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/blogs"
                  className="block text-gray-700 hover:text-green-600 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Blogs
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}