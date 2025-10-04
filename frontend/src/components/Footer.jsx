import { Sprout, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-green-50 to-blue-50 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Sprout className="h-8 w-8 text-green-600" />
              <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-500 bg-clip-text text-transparent">
                AgriHelp
              </span>
            </div>
            <p className="text-gray-600 text-sm">
              Empowering farmers with AI-driven insights for smarter farming decisions.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-green-600 transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/crop-prediction" className="text-gray-600 hover:text-green-600 transition-colors text-sm">
                  Crop Prediction
                </Link>
              </li>
              <li>
                <Link to="/fertilizer" className="text-gray-600 hover:text-green-600 transition-colors text-sm">
                  Fertilizer
                </Link>
              </li>
              <li>
                <Link to="/disease-detection" className="text-gray-600 hover:text-green-600 transition-colors text-sm">
                  Disease Detection
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/blogs" className="text-gray-600 hover:text-green-600 transition-colors text-sm">
                  Blogs
                </Link>
              </li>
              <li>
                <Link to="/settings" className="text-gray-600 hover:text-green-600 transition-colors text-sm">
                  Settings
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2 text-gray-600 text-sm">
                <Mail className="h-4 w-4" />
                <span>support@agrihelp.com</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-600 text-sm">
                <Phone className="h-4 w-4" />
                <span>+1 234 567 8900</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-600 text-sm">
                <MapPin className="h-4 w-4" />
                <span>Agricultural Hub, Green Valley</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-300 mt-8 pt-8 text-center text-gray-600 text-sm">
          <p>&copy; {new Date().getFullYear()} AgriHelp. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}