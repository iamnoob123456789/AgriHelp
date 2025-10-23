import { useState } from 'react';
import { Mail, Lock, AlertCircle, ShieldCheck } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate a successful admin login
    // In a real app, you'd call the admin login API endpoint
    setTimeout(() => {
      // For now, let's assume login is successful
      alert('Login successful! Redirecting to admin dashboard...');
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 via-gray-50 to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md lg:max-w-2xl xl:max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 xl:p-16">
          <div className="text-center mb-8 lg:mb-12">
            <div className="flex justify-center mb-4 lg:mb-6">
              <div className="p-3 lg:p-4 bg-gradient-to-br from-blue-500 to-gray-600 rounded-full">
                <ShieldCheck className="h-10 w-10 lg:h-14 lg:w-14 text-white" />
              </div>
            </div>
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-800">Admin Portal</h2>
            <p className="text-gray-600 mt-2 lg:text-lg">Sign in to manage AgriHelp</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2 text-red-700">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-6 lg:space-y-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="admin@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-gray-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-gray-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? 'Signing in...' : 'Sign In as Admin'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Not an admin?{' '}
              <a href="/login" className="text-green-600 font-semibold hover:text-green-700">
                User Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}