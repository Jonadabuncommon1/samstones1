import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { supabase } from '../../lib/supabase';
import { Mail, Lock, AlertCircle, ArrowRight } from 'lucide-react';
import { useAppContext } from '../../store/AppContext';

export const AuthView = () => {
  const { setCurrentView } = useAppContext();
  const [isSignUp, setIsSignUp] = useState(false);
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#signup') {
        setIsSignUp(true);
        setIsResetPassword(false);
      } else if (hash === '#reset') {
        setIsResetPassword(true);
        setIsSignUp(false);
      } else {
        setIsSignUp(false);
        setIsResetPassword(false);
      }
      setError(null);
      setMessage(null);
    };

    // Initial check on mount
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      if (isResetPassword) {
        if (!email) throw new Error('Please enter your email address.');
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: window.location.origin,
        });
        if (error) throw error;
        setMessage('Password reset link sent to your email.');
      } else if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        setMessage('Check your email for the confirmation link to complete registration.');
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        setCurrentView('home');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during authentication.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] text-gray-900 dark:text-gray-100 flex items-center justify-center p-4 transition-colors duration-500 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="fixed top-[-20%] left-[-10%] w-[500px] h-[500px] bg-[#e6f4e8] dark:bg-[#109121]/20 blur-[150px] rounded-full pointer-events-none -z-10 transition-colors" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-[#e6f4e8] dark:bg-[#109121]/20 blur-[150px] rounded-full pointer-events-none -z-10 transition-colors" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="glass dark:glass-card rounded-3xl p-8 md:p-10 shadow-2xl border border-gray-100 dark:border-gray-800">
          <div className="text-center mb-8">
            <h1 className="font-serif text-3xl font-bold tracking-tight text-gradient mb-2">SAMSTONES</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
              {isResetPassword 
                ? 'Enter your email to reset password'
                : isSignUp 
                  ? 'Create an account to gain access' 
                  : 'Enter your credentials to continue'}
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-6">
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-xl text-sm flex items-start">
                <AlertCircle size={18} className="mr-2 mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}
            
            {message && (
              <div className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 p-4 rounded-xl text-sm">
                {message}
              </div>
            )}

            <div className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-[#141414] border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[#109121] focus:border-transparent dark:text-white transition-all outline-none"
                  placeholder="Email address"
                />
              </div>

              {!isResetPassword && (
                <div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                      <Lock size={18} />
                    </div>
                    <input
                      type="password"
                      required={!isResetPassword}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-[#141414] border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[#109121] focus:border-transparent dark:text-white transition-all outline-none"
                      placeholder="Password"
                    />
                  </div>
                  {!isSignUp && (
                    <div className="mt-2 text-right">
                      <button
                        type="button"
                        onClick={() => window.location.hash = 'reset'}
                        className="text-xs text-[#109121] dark:text-[#16C72E] hover:underline font-semibold"
                      >
                        Forgot Password?
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#109121] hover:bg-[#0a5f15] text-white py-3.5 rounded-xl font-bold uppercase tracking-widest text-sm transition-colors flex items-center justify-center disabled:opacity-70"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  {isResetPassword ? 'Send Reset Link' : isSignUp ? 'Create Account' : 'Sign In'}
                  <ArrowRight size={18} className="ml-2" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center flex flex-col space-y-3">
            {isResetPassword ? (
              <button
                type="button"
                onClick={() => window.location.hash = 'signin'}
                className="text-sm text-gray-500 dark:text-gray-400 hover:text-[#109121] dark:hover:text-[#16C72E] transition-colors"
              >
                Back to Sign In
              </button>
            ) : (
              <button
                type="button"
                onClick={() => window.location.hash = isSignUp ? 'signin' : 'signup'}
                className="text-sm text-gray-500 dark:text-gray-400 hover:text-[#109121] dark:hover:text-[#16C72E] transition-colors"
              >
                {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
