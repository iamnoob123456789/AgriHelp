import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sprout, Mail, Lock, AlertCircle } from 'lucide-react';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const payload = { email, password };
      console.log('[LOGIN] Request payload:', payload);
      const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      console.log('[LOGIN] Response:', data);

      if (!res.ok) {
        throw new Error(data?.message || 'Login failed');
      }

      // Persist auth
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('authUser', JSON.stringify(data));

      navigate('/');
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-green-50 via-blue-50 to-green-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md lg:max-w-2xl xl:max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 xl:p-16">
          <div className="text-center mb-8 lg:mb-12">
            <div className="flex justify-center mb-4 lg:mb-6">
              <div className="p-3 lg:p-4 bg-gradient-to-br from-green-400 to-blue-500 rounded-full">
                <Sprout className="h-10 w-10 lg:h-14 lg:w-14 text-white" />
              </div>
            </div>
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-800">Welcome Back</h2>
            <p className="text-gray-600 mt-2 lg:text-lg">Sign in to your AgriHelp account</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2 text-red-700">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6 lg:space-y-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                  placeholder="farmer@example.com"
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
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 rounded-lg font-semibold hover:from-green-600 hover:to-blue-600 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="text-green-600 font-semibold hover:text-green-700">
                Sign up
              </Link>
            </p>
            <p className="text-gray-600 mt-2">
              Are you an admin?{' '}
              <Link to="/admin-login" className="text-blue-600 font-semibold hover:text-blue-700">
                Admin Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}