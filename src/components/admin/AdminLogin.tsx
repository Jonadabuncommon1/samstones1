import React, { useState } from 'react';
import { Lock, Mail, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import { useAppContext } from '../../store/AppContext';
import { ThemeToggle } from '../ThemeToggle';

export const AdminLogin = () => {
  const { loginAdmin, setCurrentView } = useAppContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = await loginAdmin(email, password);
    setLoading(false);
    if (!result.ok) {
      setError(result.error || 'Login failed.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] dark:bg-[#000000] flex transition-colors duration-500 relative">
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* Left Image Section (Hidden on Mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#109121] items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img 
          src="/footer_bg_new.png" 
          alt="Admin Background" 
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60"
        />
        <div className="relative z-20 text-center px-12 text-white">
          <div className="w-28 h-28 bg-white rounded-full p-2 mx-auto mb-8 flex items-center justify-center shadow-2xl">
             <img src="/logo.png" alt="Samstones Logo" className="w-full h-full object-contain" />
          </div>
          <h2 className="text-4xl font-serif font-bold mb-4 tracking-wide">Admin Portal</h2>
          <p className="text-lg text-white/90 max-w-md mx-auto leading-relaxed">
            Secure centralized access to manage inventory, oversee analytics, and control the marketplace ecosystem.
          </p>
        </div>
      </div>

      {/* Right Login Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 sm:px-12 py-16">
        <div className="w-full max-w-md">
          <div className="text-center lg:text-left mb-10">
            <div className="w-16 h-16 bg-[#109121]/10 text-[#109121] rounded-2xl flex items-center justify-center mx-auto lg:mx-0 mb-6 border border-[#109121]/20">
              <ShieldCheck size={32} />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">Welcome Back</h1>
            <p className="text-gray-500 dark:text-gray-400 dark:text-white">
              Please enter your credentials to access the dashboard.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wider text-xs">Email Address</label>
              <div className="relative">
                <Mail size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-white" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-xl focus:outline-none focus:border-[#109121] focus:ring-2 focus:ring-[#109121]/20 transition-all shadow-sm"
                  placeholder="admin@samstonesresources.com"
                  autoComplete="username"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wider text-xs">Password</label>
              <div className="relative">
                <Lock size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-white" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3.5 bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-xl focus:outline-none focus:border-[#109121] focus:ring-2 focus:ring-[#109121]/20 transition-all shadow-sm"
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors focus:outline-none"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/50 rounded-xl px-4 py-3 flex items-center shadow-sm">
                <span className="mr-2">⚠️</span> {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#109121] hover:bg-[#0a5f15] text-white py-3.5 rounded-xl font-bold tracking-wide transition-all shadow-lg shadow-[#109121]/20 disabled:opacity-70 disabled:cursor-not-allowed transform hover:-translate-y-0.5 active:translate-y-0"
            >
              {loading ? 'Authenticating...' : 'Sign in to Dashboard'}
            </button>
          </form>

          <button
            type="button"
            onClick={() => {
              window.location.hash = '';
              setCurrentView('home');
            }}
            className="mt-8 text-sm font-medium text-gray-500 dark:text-gray-400 dark:text-white hover:text-[#109121] dark:hover:text-[#109121] transition-colors flex items-center justify-center lg:justify-start w-full lg:w-auto"
          >
            ← Return to Marketplace
          </button>
        </div>
      </div>
    </div>
  );
};
