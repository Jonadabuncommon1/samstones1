import React, { useState } from 'react';
import { Lock, Mail } from 'lucide-react';
import { useAppContext } from '../../store/AppContext';

export const AdminLogin = () => {
  const { loginAdmin, setCurrentView } = useAppContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = loginAdmin(email, password);
    setLoading(false);
    if (!result.ok) {
      setError(result.error || 'Login failed.');
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md border border-gray-200 rounded-2xl shadow-lg p-8 bg-white">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Sign In</h1>
        <p className="text-gray-500 text-sm mb-8">
          Authorized staff only. Manage products, inventory, and platform analytics.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="relative">
              <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#109121]"
                placeholder="admin@samstones.com"
                autoComplete="username"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#109121]"
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#109121] hover:bg-[#0a5f15] text-white py-3 rounded-lg font-semibold transition-colors disabled:opacity-60"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <button
          type="button"
          onClick={() => {
            window.location.hash = '';
            setCurrentView('home');
          }}
          className="mt-6 w-full text-sm text-gray-500 hover:text-gray-900"
        >
          ← Back to marketplace
        </button>
      </div>
    </div>
  );
};
